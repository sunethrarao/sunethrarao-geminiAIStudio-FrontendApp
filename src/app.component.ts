import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ResumeDataService, SiteStats } from './services/resume-data.service';
import { ChatWidgetComponent } from './components/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatWidgetComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  dataService = inject(ResumeDataService);
  
  activeTab = signal<'executive' | 'portfolio' | 'history'>('executive');
  selectedSkill = signal<string | null>(null);
  
  // Site Stats
  siteStats = signal<SiteStats>({ viewers: 0, rating: 0, totalRatings: 0 });
  userHasRated = signal(false);
  hoveredRating = signal(0);
  
  profile = this.dataService.getProfile();
  skills = this.dataService.getSkills();
  skillEvidence = this.dataService.getSkillEvidence();
  projects = this.dataService.getProjects();
  experiences = this.dataService.getExperience();
  education = this.dataService.getEducation();
  certifications = this.dataService.getCertifications();
  awards = this.dataService.getAwards();

  ngOnInit() {
    this.dataService.incrementViewers();
    this.siteStats.set(this.dataService.getSiteStats());
  }

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

  // Rating Logic
  setHover(star: number) {
    if (!this.userHasRated()) {
      this.hoveredRating.set(star);
    }
  }

  clearHover() {
    if (!this.userHasRated()) {
      this.hoveredRating.set(0);
    }
  }

  rateSite(score: number) {
    if (this.userHasRated()) return;
    const newStats = this.dataService.submitRating(score);
    this.siteStats.set(newStats);
    this.userHasRated.set(true);
  }

  get currentStarDisplay() {
    return this.hoveredRating() || Math.round(this.siteStats().rating);
  }

  get currentYear() {
    return new Date().getFullYear();
  }
}