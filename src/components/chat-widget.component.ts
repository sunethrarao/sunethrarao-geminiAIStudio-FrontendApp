import { Component, signal, inject, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleGenAI } from '@google/genai';
import { ResumeDataService } from '../services/resume-data.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end font-sans">
      <!-- Chat Window -->
      @if (isOpen()) {
        <div class="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[450px] h-[60vh] sm:h-[550px] md:h-[600px] max-h-[80vh] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
          
          <!-- Header -->
          <div class="bg-slate-900 text-white p-3 md:p-4 flex justify-between items-center shrink-0">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-bold text-xs">AI</div>
              <div>
                <h3 class="font-semibold text-sm">Sunethra's Assistant</h3>
                <p class="text-xs text-slate-400">Powered by Gemini</p>
              </div>
            </div>
            <button (click)="toggleChat()" class="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <!-- Messages Area -->
          <div #scrollContainer class="flex-1 overflow-y-auto p-3 md:p-4 bg-slate-50 chat-scroll space-y-4">
            @for (msg of messages(); track $index) {
              <div class="flex" [class.justify-end]="msg.role === 'user'">
                <div [class]="msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-l-2xl rounded-tr-2xl p-3 max-w-[85%] text-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-r-2xl rounded-tl-2xl p-3 max-w-[85%] text-sm shadow-sm leading-relaxed'">
                  <!-- Message Content with Formatting -->
                  <div [innerHTML]="formatMessage(msg.text)"></div>
                </div>
              </div>
            }

            <!-- Suggestions -->
            @if (messages().length === 1 && !isLoading()) {
              <div class="flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2">
                <p class="text-xs text-slate-400 font-medium ml-1">Suggested questions:</p>
                @for (suggestion of suggestions; track $index) {
                  <button 
                    (click)="sendSuggestion(suggestion)"
                    class="text-left text-xs md:text-sm bg-white border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 rounded-lg px-3 py-2 transition-all shadow-sm"
                  >
                    {{ suggestion }}
                  </button>
                }
              </div>
            }

            @if (isLoading()) {
              <div class="flex justify-start">
                <div class="bg-white border border-slate-200 rounded-r-2xl rounded-tl-2xl p-3 shadow-sm">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Input Area -->
          <div class="p-3 bg-white border-t border-slate-100 shrink-0">
            <form (submit)="sendMessage($event)" class="flex gap-2">
              <input 
                type="text" 
                [(ngModel)]="currentMessage" 
                name="message" 
                placeholder="Ask about my experience..." 
                class="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                [disabled]="isLoading()"
              >
              <button 
                type="submit" 
                [disabled]="!currentMessage.trim() || isLoading()"
                class="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
          </div>
        </div>
      }

      <!-- Toggle Button -->
      <button 
        (click)="toggleChat()" 
        class="h-12 w-12 md:h-14 md:w-14 rounded-full bg-slate-900 text-white shadow-xl flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all duration-300 ring-4 ring-white"
      >
        @if (!isOpen()) {
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        }
      </button>
    </div>
  `
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  
  isOpen = signal(false);
  isLoading = signal(false);
  currentMessage = '';
  messages = signal<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello! I'm Sunethra's AI assistant. Ask me anything about her leadership style, technical skills, or project experience." }
  ]);

  suggestions = [
    "What are the top skills?",
    "What are roles that Sunethra will fit in?",
    "What are the strengths and weakness?"
  ];

  private dataService = inject(ResumeDataService);
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  sendSuggestion(text: string) {
    this.currentMessage = text;
    this.sendMessage();
  }

  async sendMessage(event?: Event) {
    if (event) event.preventDefault();
    if (!this.currentMessage.trim()) return;

    const userMsg = this.currentMessage;
    this.currentMessage = '';
    this.messages.update(m => [...m, { role: 'user', text: userMsg }]);
    this.isLoading.set(true);

    try {
      const response = await this.generateResponse(userMsg);
      this.messages.update(m => [...m, { role: 'model', text: response }]);
    } catch (error) {
      this.messages.update(m => [...m, { role: 'model', text: "I apologize, but I'm having trouble connecting right now. Please try again later." }]);
      console.error(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatMessage(text: string): string {
    if (!text) return '';
    
    let formatted = text;
    
    // Convert newlines to breaks
    formatted = formatted.replace(/\n/g, '<br>');

    // Format bold text: **text** -> <strong>text</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
    
    // Format bullet points (lines starting with - or * in markdown style)
    // Matches <br>- or start of string -
    formatted = formatted.replace(/(<br>|^)\s*[-*]\s+/g, '$1<span class="text-amber-500 font-bold mx-2">•</span>');

    return formatted;
  }

  private async generateResponse(prompt: string): Promise<string> {
    const profile = this.dataService.getProfile();
    const skills = this.dataService.getSkills();
    const experience = this.dataService.getExperience();
    const projects = this.dataService.getProjects();
    const evidence = this.dataService.getSkillEvidence();
    const certifications = this.dataService.getCertifications();
    const awards = this.dataService.getAwards();
    
    // Construct context
    const context = `
      You are an AI assistant for Sunethra Krishnaraj, a Director-level Frontend Engineering Manager.
      Answer questions professionally based STRICTLY on the following context.
      
      FORMATTING RULES:
      1. Use **bullet points** (start lines with "- ") for lists.
      2. **Bold** key technologies, achievements, or important numbers using double asterisks (e.g., **Angular**, **20+ team members**).
      3. Keep paragraphs concise.
      
      CRITICAL RULES:
      1. Do NOT reveal phone numbers.
      2. If asked about contact info, only suggest LinkedIn (https://www.linkedin.com/in/sunethra-krishnaraj/) or sunethrarao@gmail.com email address.
      3. Use Industry-based terms for clients (e.g., use "Immigration Services Portal" instead of specific client names like Fragomen).
      4. Maintain a professional, executive tone.
      
      PROFILE:
      Name: ${profile.name}
      Title: ${profile.title}
      Summary: ${profile.summary}
      
      SKILLS & EVIDENCE:
      ${Object.entries(evidence).map(([k, v]) => `${k}: ${v}`).join('\n')}

      CERTIFICATIONS:
      ${certifications.join('\n')}

      AWARDS:
      ${awards.join('\n')}
      
      KEY PROJECTS (use these summaries):
      ${projects.map(p => `
        - Project: ${p.name} (${p.category})
        - Summary: ${p.summary}
        - Tech: ${p.technologies.join(', ')}
      `).join('\n')}
      
      EXPERIENCE HISTORY:
      ${experience.map(e => `
        - Role: ${e.role} at ${e.company} (${e.period})
        - Highlights: ${e.highlights.join('; ')}
      `).join('\n')}
      
      User Question: ${prompt}
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });

    return response.text;
  }
}