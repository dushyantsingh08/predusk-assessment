'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Globe, Search, ExternalLink, Mail, Zap, Grid, Layout, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Skill {
    _id: string;
    name: string;
    level: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    liveUrl?: string;
    repoUrl?: string;
    skills: Skill[];
}

interface Profile {
    name: string;
    email: string;
    bio: string;
    socialLinks: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
    education: Array<{
        degree: string;
        school: string;
        year: string;
    }>;
    experience: Array<{
        role: string;
        company: string;
        position: string;
        startDate: string;
        endDate: string | null;
        description: string;
    }>;
}

interface ClientPageProps {
    initialProfile: Profile | null;
    initialProjects: Project[];
    initialSkills: Skill[];
}

export default function ClientPage({ initialProfile, initialProjects, initialSkills }: ClientPageProps) {
    const [profile] = useState<Profile | null>(initialProfile);
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [skills] = useState<Skill[]>(initialSkills);
    const [loading, setLoading] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSkillClick = async (skillName: string) => {
        setLoading(true);
        try {
            if (selectedSkill === skillName) {
                setSelectedSkill(null);
                const res = await fetch('/api/search');
                if (res.ok) setProjects(await res.json());
            } else {
                setSelectedSkill(skillName);
                const res = await fetch(`/api/projects/skill/${encodeURIComponent(skillName)}`);
                if (res.ok) setProjects(await res.json());
            }
        } catch (error) {
            console.error('Failed to filter projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            setSelectedSkill(null);
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (res.ok) setProjects(await res.json());
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Present';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-neutral-50">

            <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-8">

                {/* 1. Header Section - Boxed Card Design */}
                {profile && (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center">
                        <div className="flex flex-col items-center gap-6">

                            {/* Avatar / Initials */}
                            <div className="h-32 w-32 rounded-full bg-neutral-100 border-4 border-white flex items-center justify-center flex-shrink-0 shadow-lg ring-1 ring-neutral-100">
                                <span className="text-4xl font-bold text-neutral-800 tracking-wider">
                                    {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="space-y-4 max-w-3xl mx-auto">
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-3">{profile.name}</h1>
                                    <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light">{profile.bio}</p>
                                </div>

                                {/* Social Links */}
                                <div className="flex flex-wrap justify-center gap-3 pt-2">
                                    {profile.socialLinks.github && (
                                        <Link href={profile.socialLinks.github} target="_blank" className="bg-neutral-50 hover:bg-neutral-100 text-neutral-700 px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all border border-neutral-200 hover:border-neutral-300">
                                            <Github className="h-4 w-4" /> GitHub
                                        </Link>
                                    )}
                                    {profile.socialLinks.linkedin && (
                                        <Link href={profile.socialLinks.linkedin} target="_blank" className="bg-neutral-50 hover:bg-neutral-100 text-neutral-700 px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all border border-neutral-200 hover:border-neutral-300">
                                            <Linkedin className="h-4 w-4" /> LinkedIn
                                        </Link>
                                    )}
                                    {profile.socialLinks.portfolio && (
                                        <Link href={profile.socialLinks.portfolio} target="_blank" className="bg-neutral-50 hover:bg-neutral-100 text-neutral-700 px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all border border-neutral-200 hover:border-neutral-300">
                                            <Globe className="h-4 w-4" /> Portfolio
                                        </Link>
                                    )}
                                    <div className="flex items-center gap-2 px-5 py-2.5 text-neutral-500 text-sm bg-transparent">
                                        <Mail className="h-4 w-4" /> {profile.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* 2. Sidebar - Skills & Education */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Education */}
                        {profile && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                                <h3 className="font-bold text-lg mb-4 text-neutral-800 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-neutral-900" /> Education
                                </h3>
                                <div className="space-y-6">
                                    {profile.education.map((edu, idx) => (
                                        <div key={idx} className="relative pl-6 border-l-2 border-neutral-100 pb-1">
                                            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-300 ring-4 ring-white"></div>
                                            <p className="font-bold text-neutral-800 leading-tight">{edu.school}</p>
                                            <p className="text-sm text-neutral-500 mt-1">{edu.degree}</p>
                                            <p className="text-xs text-neutral-400 mt-1 font-mono bg-neutral-50 inline-block px-1.5 py-0.5 rounded">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3. Main Content - Experience & Projects */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Experience Section - Now Full Width */}
                        {profile && profile.experience && profile.experience.length > 0 && (
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-200">
                                <h3 className="font-bold text-xl mb-6 text-neutral-800 flex items-center gap-2 border-b border-neutral-100 pb-4">
                                    <Briefcase className="h-5 w-5 text-neutral-900" /> Professional Experience
                                </h3>
                                <div className="space-y-8">
                                    {profile.experience.map((exp, idx) => (
                                        // @ts-ignore
                                        <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6 group">
                                            {/* Date Column (Desktop) */}
                                            <div className="md:w-48 flex-shrink-0 pt-1">
                                                <p className="text-sm font-mono text-neutral-500 bg-neutral-50 inline-block px-2 py-1 rounded border border-neutral-100">
                                                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                                </p>
                                            </div>

                                            {/* Content Column */}
                                            <div className="flex-grow relative pl-4 md:pl-0 border-l-2 md:border-l-0 border-neutral-100">
                                                <h4 className="text-lg font-bold text-neutral-900">{exp.position || exp.role}</h4>
                                                <p className="text-neutral-700 font-medium mb-2">{exp.company}</p>
                                                <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{exp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects Section */}
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-neutral-800 font-bold text-lg">
                                        <Grid className="h-5 w-5 text-neutral-400" />
                                        Projects
                                        <span className="text-neutral-400 font-normal text-sm">({projects.length})</span>
                                    </div>

                                    <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border-none rounded-lg focus:ring-2 focus:ring-neutral-200 text-sm font-medium transition-all placeholder:text-neutral-400"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                                if (e.target.value === '') {
                                                    setLoading(true);
                                                    fetch('/api/search').then(res => res.json()).then(data => {
                                                        setProjects(data);
                                                        setLoading(false);
                                                    });
                                                }
                                            }}
                                        />
                                    </form>
                                </div>

                                {/* Skills Filter - Moved Here */}
                                <div className="border-t border-neutral-100 pt-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Badge
                                            variant={selectedSkill === null ? "default" : "outline"}
                                            className="cursor-pointer py-1.5 px-3 hover:bg-neutral-100 transition-colors border-neutral-200 text-neutral-600"
                                            onClick={() => handleSkillClick(selectedSkill || '')}
                                        >
                                            All
                                        </Badge>
                                        {skills.map(skill => (
                                            <Badge
                                                key={skill._id}
                                                variant={selectedSkill === skill.name ? "default" : "secondary"}
                                                className={cn(
                                                    "cursor-pointer py-1.5 px-3 transition-colors border",
                                                    selectedSkill === skill.name
                                                        ? "bg-neutral-900 text-white border-neutral-900"
                                                        : "bg-neutral-50 text-neutral-700 border-neutral-100 hover:bg-neutral-100"
                                                )}
                                                onClick={() => handleSkillClick(skill.name)}
                                            >
                                                {skill.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center p-8">
                                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-800"></div>
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                                    <div className="bg-neutral-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="h-8 w-8 text-neutral-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-700">No projects found</h3>
                                    <p className="text-neutral-500">Try adjusting your filters or search query.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {projects.map(project => (
                                        <Card key={project._id} className="group hover:shadow-lg transition-all duration-300 border-neutral-200 bg-white flex flex-col h-full hover:-translate-y-1">
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="h-10 w-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-3 text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
                                                        <Layout className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {project.repoUrl && (
                                                            <Link href={project.repoUrl} target="_blank" className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-900">
                                                                <Github className="h-4 w-4" />
                                                            </Link>
                                                        )}
                                                        {project.liveUrl && (
                                                            <Link href={project.liveUrl} target="_blank" className="p-2 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-blue-600">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                                <CardTitle className="text-lg font-bold text-neutral-800 leading-tight">
                                                    {project.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow flex flex-col justify-between pt-0">
                                                <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                                                    {project.description}
                                                </p>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.skills.slice(0, 4).map(skill => (
                                                        <span key={skill._id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-50 text-neutral-600 border border-neutral-100">
                                                            {skill.name}
                                                        </span>
                                                    ))}
                                                    {project.skills.length > 4 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-50 text-neutral-400 border border-neutral-100">
                                                            +{project.skills.length - 4}
                                                        </span>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
