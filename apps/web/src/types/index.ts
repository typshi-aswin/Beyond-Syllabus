export interface Module {
  title: string;
  content: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  category?: 'Code' | 'Math' | 'Physics' | 'Core';
  modules: Module[];
  fullSyllabus: string;
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Scheme {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface Program {
  id: string;
  name: string;
  schemes: Scheme[];
}

export interface University {
  id: string;
  name: string;
  programs: Program[];
}
