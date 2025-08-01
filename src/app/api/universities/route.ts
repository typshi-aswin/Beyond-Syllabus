import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const universitiesDir = path.join(process.cwd(), 'universities');

function capitalizeWords(str: string): string {
    if (!str) return '';
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatSemesterName(semesterId: string): string {
    if (!semesterId) return '';
    return `Semester ${semesterId.replace('s', '').replace(/^0+/, '')}`;
}

async function readSyllabusData() {
    const data: any = {};

    try {
        if (!fs.existsSync(universitiesDir)) {
             console.error(`Directory not found: ${universitiesDir}`);
             return { error: 'University data directory not found. Please ensure the `universities` folder exists at the root of your project.' };
        }
        const universities = await fs.promises.readdir(universitiesDir);

        for (const universityId of universities) {
            const universityPath = path.join(universitiesDir, universityId);
            if (!(await fs.promises.lstat(universityPath)).isDirectory()) continue;
            const programDirs = await fs.promises.readdir(universityPath);

            data[universityId] = {};

            for (const programId of programDirs) {
                const programPath = path.join(universityPath, programId);
                 if (!(await fs.promises.lstat(programPath)).isDirectory()) continue;
                const schemeDirs = await fs.promises.readdir(programPath);

                data[universityId][programId] = {};

                for (const schemeId of schemeDirs) {
                    const schemePath = path.join(programPath, schemeId);
                     if (!(await fs.promises.lstat(schemePath)).isDirectory()) continue;
                    const semesterDirs = await fs.promises.readdir(schemePath);

                     data[universityId][programId][schemeId] = {};


                    for (const semesterId of semesterDirs) {
                         const semesterPath = path.join(schemePath, semesterId);
                          if (!(await fs.promises.lstat(semesterPath)).isDirectory()) continue;
                         const subjectFiles = await fs.promises.readdir(semesterPath);

                         data[universityId][programId][schemeId][semesterId] = { subjects: [] };


                        for (const subjectFile of subjectFiles) {
                            if (subjectFile.endsWith('.md')) {
                                const subjectFilePath = path.join(semesterPath, subjectFile);
                                const fileContent = await fs.promises.readFile(subjectFilePath, 'utf-8');
                                const { data: frontmatter, content } = matter(fileContent);

                                const moduleItems: { title: string; content: string }[] = [];
                                const lines = content.split('\n');
                                let currentModule: { title: string; content: string[] } | null = null;
                            
                                for (const line of lines) {
                                    const moduleMatch = line.match(/^#+\s*Module\s*-\s*\d+\s*(?:\((.*?)\))?(.+)?$/im) || line.match(/^#+\s*Module\s*\d+:\s*(.+)/im) || line.match(/^###\s*(Module\s*\d+.*)/im);
                                    if (moduleMatch) {
                                        if (currentModule) {
                                            moduleItems.push({
                                                title: currentModule.title,
                                                content: currentModule.content.join('\n').trim(),
                                            });
                                        }
                                        // Extract title from any of the matching groups
                                        const titleText = (moduleMatch[1] || moduleMatch[2] || moduleMatch[0]).replace(/#+\s*Module\s*-\s*\d+\s*:?\s*\(?/, '').replace(/\)?/, '').trim();
                                        currentModule = {
                                            title: titleText,
                                            content: [],
                                        };
                                    } else if (currentModule && line.trim() !== '') {
                                        currentModule.content.push(line.replace(/^- /, '• '));
                                    }
                                }
                            
                                if (currentModule) {
                                    moduleItems.push({
                                        title: currentModule.title,
                                        content: currentModule.content.join('\n').trim(),
                                    });
                                }

                                const subjectData = {
                                    id: subjectFile.replace('.md', ''),
                                    code: frontmatter.course_code || 'N/A',
                                    name: frontmatter.course_title || 'N/A',
                                    fullSyllabus: content.trim(),
                                    modules: moduleItems,
                                    university: frontmatter.university || 'N/A',
                                    program: frontmatter.branch || 'N/A',
                                    scheme: frontmatter.version || 'N/A',
                                    semester: frontmatter.semester || 'N/A',
                                };
                                data[universityId][programId][schemeId][semesterId].subjects.push(subjectData);
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error reading syllabus data:", error);
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
             return { error: 'University data directory not found. Please ensure the `universities` folder exists at the root of your project.' };
        }
        return { error: 'An unexpected error occurred while reading syllabus data.' };
    }

    return data;
}


export async function GET() {
    const syllabusData = await readSyllabusData();

    if (!syllabusData) {
        return NextResponse.json({ error: 'Failed to load syllabus data' }, { status: 500 });
    }
     if (syllabusData.error) {
        return NextResponse.json({ error: syllabusData.error }, { status: 500 });
    }

    return NextResponse.json(syllabusData);
}
