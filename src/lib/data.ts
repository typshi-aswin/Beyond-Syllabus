import type { University } from '@/types';

export const universities: University[] = [
  {
    id: 'ktu',
    name: 'APJ Abdul Kalam Technological University (KTU)',
    programs: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering',
        semesters: [
          {
            id: 's3',
            name: 'Semester 3',
            subjects: [
              {
                id: 'cst201',
                code: 'CST201',
                name: 'Data Structures',
                fullSyllabus: `Module 1: Introduction to data structures - Arrays, Stacks, Queues.
Module 2: Linked lists - Singly, Doubly, and Circular lists.
Module 3: Trees - Binary trees, traversal, BST, AVL trees.
Module 4: Graphs - Representation, traversal (BFS, DFS), shortest path.
Module 5: Hashing and Heaps - Hash tables, heap data structure.`,
                modules: [
                  { title: 'Introduction to Data Structures', content: 'Arrays, Stacks, Queues, and their applications. Asymptotic notations for complexity analysis.' },
                  { title: 'Linked Lists', content: 'Singly, Doubly, and Circular linked lists. Operations like insertion, deletion, and traversal.' },
                  { title: 'Trees', content: 'Binary Trees, Binary Search Trees (BST), Tree Traversals (In-order, Pre-order, Post-order), AVL Trees, B-Trees.' },
                  { title: 'Graphs', content: 'Representation of Graphs (Adjacency Matrix, Adjacency List), Traversal algorithms (BFS, DFS), Spanning Trees.' },
                  { title: 'Hashing and Heaps', content: 'Hash functions, collision resolution techniques. Heap data structure, Min-Heap, Max-Heap, Heap Sort.' },
                ],
              },
              {
                id: 'cst203',
                code: 'CST203',
                name: 'Logic System Design',
                fullSyllabus: `Module 1: Number systems and codes.
Module 2: Boolean algebra and logic gates.
Module 3: Combinational logic circuits.
Module 4: Sequential logic circuits - Flip-flops, registers, counters.
Module 5: Memory and Programmable Logic.`,
                modules: [
                    { title: 'Number Systems & Codes', content: 'Binary, Octal, Hexadecimal numbers, conversions. BCD, Gray codes, ASCII.' },
                    { title: 'Boolean Algebra & Logic Gates', content: 'Boolean postulates and laws. De-Morgan\'s Theorem. Logic gates, Universal gates.' },
                    { title: 'Combinational Logic Circuits', content: 'Adders, Subtractors, Multiplexers, Demultiplexers, Decoders, Encoders.' },
                    { title: 'Sequential Logic Circuits', content: 'Flip-flops (SR, JK, T, D), registers, shift registers, ripple and synchronous counters.' },
                    { title: 'Memory and Programmable Logic', content: 'RAM, ROM, PROM, EPROM. PLA, PAL.' },
                ],
              },
            ],
          },
          {
            id: 's4',
            name: 'Semester 4',
            subjects: [
              {
                id: 'cst202',
                code: 'CST202',
                name: 'Computer Organization and Architecture',
                fullSyllabus: `Module 1: Basic structure of computers.
Module 2: Machine instructions and programs.
Module 3: Input/Output organization.
Module 4: Memory system.
Module 5: Processing unit.`,
                modules: [
                    { title: 'Basic Structure of Computers', content: 'Functional units, basic operational concepts, bus structures, software, performance.' },
                    { title: 'Machine Instructions and Programs', content: 'Memory locations and addresses, memory operations, instructions and instruction sequencing, addressing modes.' },
                    { title: 'Input/Output Organization', content: 'Accessing I/O devices, interrupts, direct memory access.' },
                    { title: 'The Memory System', content: 'Basic concepts, semiconductor RAM memories, read only memories, speed, size, and cost, cache memories.' },
                    { title: 'Processing Unit', content: 'Some fundamental concepts, execution of a complete instruction, multiple bus organization, hard-wired control, microprogrammed control.' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        semesters: [
            {
                id: 's3',
                name: 'Semester 3',
                subjects: [
                    {
                        id: 'ect201',
                        code: 'ECT201',
                        name: 'Solid State Devices',
                        fullSyllabus: `Module 1: Semiconductor Physics.
Module 2: P-N Junction Diode.
Module 3: Bipolar Junction Transistors (BJT).
Module 4: Field-Effect Transistors (FET).
Module 5: Power Devices and Display Devices.`,
                        modules: [
                            { title: 'Semiconductor Physics', content: 'Energy bands in solids, charge carriers, drift and diffusion currents.' },
                            { title: 'P-N Junction Diode', content: 'Formation of P-N junction, V-I characteristics, Zener diode, rectifiers.' },
                            { title: 'Bipolar Junction Transistors (BJT)', content: 'Construction, operation, configurations (CB, CE, CC), biasing.' },
                            { title: 'Field-Effect Transistors (FET)', content: 'JFET, MOSFET (Enhancement and Depletion types), characteristics.' },
                            { title: 'Power Devices and Display Devices', content: 'SCR, DIAC, TRIAC. LED, LCD, Photo-diodes.' },
                        ],
                    },
                ]
            }
        ]
      }
    ],
  },
];
