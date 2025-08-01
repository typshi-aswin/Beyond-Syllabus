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
        const universities = await fs.promises.readdir(universitiesDir);

        for (const universityId of universities) {
            const universityPath = path.join(universitiesDir, universityId);
            const programDirs = await fs.promises.readdir(universityPath);

            data[universityId] = {};

            for (const programId of programDirs) {
                const programPath = path.join(universityPath, programId);
                const schemeDirs = await fs.promises.readdir(programPath);

                data[universityId][programId] = {};

                for (const schemeId of schemeDirs) {
                    const schemePath = path.join(programPath, schemeId);
                    const semesterDirs = await fs.promises.readdir(schemePath);

                     data[universityId][programId][schemeId] = {};


                    for (const semesterId of semesterDirs) {
                         const semesterPath = path.join(schemePath, semesterId);
                         const subjectFiles = await fs.promises.readdir(semesterPath);

                         data[universityId][programId][schemeId][semesterId] = { subjects: [] };


                        for (const subjectFile of subjectFiles) {
                            if (subjectFile.endsWith('.md')) {
                                const subjectFilePath = path.join(semesterPath, subjectFile);
                                const fileContent = await fs.promises.readFile(subjectFilePath, 'utf-8');
                                const { data: frontmatter, content } = matter(fileContent);

                                const courseContentMatch = content.match(/^##\s*Course Content([\s\S]*?)(?=^##\s*|\Z)/m);
let courseContent = courseContentMatch ? courseContentMatch[1] : '';

// Fallback: If not found, use the whole content
if (!courseContent.trim()) {
    courseContent = content;
}

const moduleItems = [];
// Regex to find each module subheading and its content
const moduleRegex = /^###\s*Module\s*-\s*\d+\s*\((.*?)\)\s*\n([\s\S]*?)(?=^###\s*Module\s*-\s*\d+|\Z)/gm;

let moduleMatch;
while ((moduleMatch = moduleRegex.exec(courseContent)) !== null) {
    const moduleTitle = moduleMatch[1].trim();
    const moduleContent = moduleMatch[2].trim();

    // Clean up module content (remove extra blank lines, etc.)
    const cleanedContent = moduleContent.split('\n').filter(line => line.trim() !== '').join('\n');

    moduleItems.push({
        title: moduleTitle,
        content: cleanedContent
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
        return null;
    }

    return data;
}


export async function GET() {
    const syllabusData = await readSyllabusData();

    if (!syllabusData) {
        return NextResponse.json({ error: 'Failed to load syllabus data' }, { status: 500 });
    }

    return NextResponse.json(syllabusData);
}
