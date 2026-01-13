import { Component, signal, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ResumeDataService } from './services/resume-data.service';
import { ChatWidgetComponent } from './components/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatWidgetComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
})
export class AppComponent {
  dataService = inject(ResumeDataService);
  
  activeTab = signal<'executive' | 'portfolio' | 'history'>('executive');
  selectedSkill = signal<string | null>(null);
  
  profile = this.dataService.getProfile();
  skills = this.dataService.getSkills();
  skillEvidence = this.dataService.getSkillEvidence();
  projects = this.dataService.getProjects();
  experiences = this.dataService.getExperience();
  education = this.dataService.getEducation();
  certifications = this.dataService.getCertifications();
  awards = this.dataService.getAwards();

  setTab(tab: 'executive' | 'portfolio' | 'history') {
    this.activeTab.set(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectSkill(skillName: string) {
    if (this.skillEvidence[skillName]) {
      this.selectedSkill.set(skillName);
    }
  }

  clearSelectedSkill() {
    this.selectedSkill.set(null);
  }

  get currentYear() {
    return new Date().getFullYear();
  }
}