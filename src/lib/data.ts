
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
            id: 's1',
            name: 'Semester 1',
            subjects: [
              {
                id: 'mat101',
                code: 'MAT101',
                name: 'Linear Algebra and Calculus',
                fullSyllabus: `Module 1: Systems of linear equations, matrices.
Module 2: Vector spaces, basis and dimension.
Module 3: Linear transformations, eigenvalues and eigenvectors.
Module 4: Differential calculus, limits, continuity, derivatives.
Module 5: Integral calculus, definite and indefinite integrals.`,
                modules: [
                  { title: 'Linear Equations and Matrices', content: 'Solving systems of linear equations using matrices, row echelon form, determinants.' },
                  { title: 'Vector Spaces', content: 'Vector spaces and subspaces, linear independence, basis and dimension.' },
                  { title: 'Linear Transformations', content: 'Kernel and range of a linear transformation, eigenvalues and eigenvectors, diagonalization.' },
                  { title: 'Differential Calculus', content: 'Limits, continuity, derivatives, mean value theorem, applications of derivatives.' },
                  { title: 'Integral Calculus', content: 'Fundamental theorem of calculus, techniques of integration, applications of integrals.' },
                ],
              },
              {
                id: 'phy101',
                code: 'PHY101',
                name: 'Engineering Physics',
                fullSyllabus: `Module 1: Mechanics.
Module 2: Optics.
Module 3: Electromagnetism.
Module 4: Quantum Mechanics.
Module 5: Thermodynamics.`,
                modules: [
                  { title: 'Mechanics', content: 'Newton\'s laws, work and energy, rotational motion, simple harmonic motion.' },
                  { title: 'Optics', content: 'Interference, diffraction, polarization of light, lasers and optical fibers.' },
                  { title: 'Electromagnetism', content: 'Maxwell\'s equations, electromagnetic waves, Poynting vector.' },
                  { title: 'Quantum Mechanics', content: 'Introduction to quantum theory, Schrodinger equation, wave-particle duality.' },
                  { title: 'Thermodynamics', content: 'Laws of thermodynamics, entropy, heat engines, refrigeration.' },
                ],
              },
            ],
          },
          {
            id: 's2',
            name: 'Semester 2',
            subjects: [
              {
                id: 'cyt100',
                code: 'CYT100',
                name: 'Engineering Chemistry',
                fullSyllabus: `Module 1: Chemical kinetics.
Module 2: Electrochemistry.
Module 3: Spectroscopy.
Module 4: Water technology.
Module 5: Polymer chemistry.`,
                modules: [
                    { title: 'Chemical Kinetics', content: 'Rate of reaction, order and molecularity, activation energy.' },
                    { title: 'Electrochemistry', content: 'Electrochemical cells, Nernst equation, corrosion and its prevention.' },
                    { title: 'Spectroscopy', content: 'UV-Visible, IR, and NMR spectroscopy and their applications.' },
                    { title: 'Water Technology', content: 'Hardness of water, treatment methods, desalination.' },
                    { title: 'Polymer Chemistry', content: 'Classification of polymers, plastics, rubbers, conducting polymers.' },
                ],
              },
              {
                id: 'est100',
                code: 'EST100',
                name: 'Engineering Mechanics',
                fullSyllabus: `Module 1: Statics of particles.
Module 2: Equilibrium of rigid bodies.
Module 3: Properties of surfaces and solids.
Module 4: Dynamics of particles.
Module 5: Fricton.`,
                modules: [
                    { title: 'Statics of Particles', content: 'Forces in a plane, resultant of forces, equilibrium of a particle.' },
                    { title: 'Equilibrium of Rigid Bodies', content: 'Free-body diagrams, types of supports, moments and couples.' },
                    { title: 'Properties of Surfaces and Solids', content: 'Centroids, moment of inertia, polar moment of inertia.' },
                    { title: 'Dynamics of Particles', content: 'Kinematics and kinetics of particles, Newton\'s second law, work-energy principle.' },
                    { title: 'Friction', content: 'Laws of dry friction, wedges, screws, and belt friction.' },
                ],
              },
            ],
          },
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
              {
                id: 'cst204',
                code: 'CST204',
                name: 'Database Management Systems',
                fullSyllabus: `Module 1: Introduction to database systems.
Module 2: Relational model and algebra.
Module 3: SQL.
Module 4: Database design and normalization.
Module 5: Transaction management and concurrency control.`,
                modules: [
                    { title: 'Introduction', content: 'Database system architecture, data models, database users and administrator.' },
                    { title: 'Relational Model', content: 'Relational algebra, tuple relational calculus, domain relational calculus.' },
                    { title: 'SQL', content: 'Data definition, data manipulation, and transaction control. Views, indexes, and sequences.' },
                    { title: 'Database Design', content: 'ER diagrams, normalization (1NF, 2NF, 3NF, BCNF).' },
                    { title: 'Transactions', content: 'ACID properties, concurrency control, locking protocols, recovery management.' },
                ],
              },
            ],
          },
          {
            id: 's5',
            name: 'Semester 5',
            subjects: [
              {
                id: 'cst301',
                code: 'CST301',
                name: 'Operating Systems',
                fullSyllabus: `Module 1: Introduction to operating systems.
Module 2: Process management.
Module 3: Process synchronization and deadlocks.
Module 4: Memory management.
Module 5: Storage management.`,
                modules: [
                  { title: 'Introduction', content: 'Operating system structure, services, system calls, virtual machines.' },
                  { title: 'Process Management', content: 'Process concept, scheduling, operations on processes, interprocess communication.' },
                  { title: 'Synchronization & Deadlocks', content: 'Critical-section problem, semaphores, monitors, deadlock characterization and handling.' },
                  { title: 'Memory Management', content: 'Swapping, paging, segmentation, virtual memory, demand paging.' },
                  { title: 'Storage Management', content: 'File system interface, implementation, disk scheduling, RAID structure.' },
                ],
              },
            ],
          },
          {
            id: 's6',
            name: 'Semester 6',
            subjects: [
              {
                id: 'cst302',
                code: 'CST302',
                name: 'Computer Networks',
                fullSyllabus: `Module 1: Introduction to computer networks and the Internet.
Module 2: Application layer.
Module 3: Transport layer.
Module 4: Network layer.
Module 5: Link layer.`,
                modules: [
                  { title: 'Introduction', content: 'Network edge, core, access networks, physical media, OSI and TCP/IP models.' },
                  { title: 'Application Layer', content: 'Principles of network applications, Web and HTTP, FTP, email, DNS.' },
                  { title: 'Transport Layer', content: 'Multiplexing and demultiplexing, connectionless transport (UDP), principles of reliable data transfer (TCP).' },
                  { title: 'Network Layer', content: 'Virtual circuit and datagram networks, router, IP, routing algorithms.' },
                  { title: 'Link Layer', content: 'Error detection and correction, multiple access links and protocols, LANs.' },
                ],
              },
            ],
          },
          {
            id: 's7',
            name: 'Semester 7',
            subjects: [
              {
                id: 'cst401',
                code: 'CST401',
                name: 'Artificial Intelligence',
                fullSyllabus: `Module 1: Introduction to AI.
Module 2: Problem solving through search.
Module 3: Knowledge representation and reasoning.
Module 4: Machine Learning.
Module 5: Advanced AI topics.`,
                modules: [
                  { title: 'Introduction', content: 'History of AI, intelligent agents, environments.' },
                  { title: 'Search', content: 'Uninformed and informed search strategies, adversarial search.' },
                  { title: 'Knowledge Representation', content: 'Logic, ontologies, semantic networks.' },
                  { title: 'Machine Learning', content: 'Supervised, unsupervised, and reinforcement learning.' },
                  { title: 'Advanced Topics', content: 'Natural Language Processing, Robotics, Computer Vision.' },
                ],
              },
            ],
          },
          {
            id: 's8',
            name: 'Semester 8',
            subjects: [
              {
                id: 'cst402',
                code: 'CST402',
                name: 'Cryptography and Network Security',
                fullSyllabus: `Module 1: Introduction to security.
Module 2: Symmetric ciphers.
Module 3: Asymmetric ciphers.
Module 4: Network security applications.
Module 5: System security.`,
                modules: [
                  { title: 'Introduction', content: 'Security attacks, services, and mechanisms, a model for network security.' },
                  { title: 'Symmetric Ciphers', content: 'Classical encryption techniques, block ciphers and the Data Encryption Standard (DES), Advanced Encryption Standard (AES).' },
                  { title: 'Asymmetric Ciphers', content: 'Public-key cryptography, RSA, Diffie-Hellman key exchange.' },
                  { title: 'Network Security', content: 'IPSec, SSL, TLS, PGP, S/MIME.' },
                  { title: 'System Security', content: 'Intruders, viruses and related threats, firewalls.' },
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
            id: 's1',
            name: 'Semester 1',
            subjects: [
                { id: 'mat101', name: 'Linear Algebra and Calculus', code: 'MAT101', fullSyllabus: '...', modules: [] },
                { id: 'phy101', name: 'Engineering Physics', code: 'PHY101', fullSyllabus: '...', modules: [] }
            ]
          },
          {
            id: 's2',
            name: 'Semester 2',
            subjects: [
                { id: 'cyt100', name: 'Engineering Chemistry', code: 'CYT100', fullSyllabus: '...', modules: [] },
                { id: 'est100', name: 'Engineering Mechanics', code: 'EST100', fullSyllabus: '...', modules: [] }
            ]
          },
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
              {
                id: 'ect203',
                code: 'ECT203',
                name: 'Logic Circuit Design',
                fullSyllabus: `Module 1: Number systems and codes.
Module 2: Boolean algebra and logic gates.
Module 3: Combinational logic circuits.
Module 4: Sequential logic circuits.
Module 5: Digital integrated circuits.`,
                modules: [
                  { title: 'Number Systems', content: 'Binary, octal, hexadecimal, BCD, Gray code.' },
                  { title: 'Logic Gates', content: 'AND, OR, NOT, NAND, NOR, XOR, XNOR gates. Universal gates.' },
                  { title: 'Combinational Circuits', content: 'Adders, subtractors, multiplexers, demultiplexers, encoders, decoders.' },
                  { title: 'Sequential Circuits', content: 'Flip-flops, registers, counters, state machines.' },
                  { title: 'Digital ICs', content: 'TTL, CMOS, ECL logic families, characteristics and specifications.' },
                ],
              },
            ]
          },
          {
            id: 's4',
            name: 'Semester 4',
            subjects: [ { id: 'ect202', name: 'Analog Circuits', code: 'ECT202', fullSyllabus: '...', modules: [] } ]
          },
          {
            id: 's5',
            name: 'Semester 5',
            subjects: [ { id: 'ect301', name: 'Linear Integrated Circuits', code: 'ECT301', fullSyllabus: '...', modules: [] } ]
          },
          {
            id: 's6',
            name: 'Semester 6',
            subjects: [ { id: 'ect302', name: 'Digital Signal Processing', code: 'ECT302', fullSyllabus: '...', modules: [] } ]
          },
          {
            id: 's7',
            name: 'Semester 7',
            subjects: [ { id: 'ect401', name: 'Microwave Engineering', code: 'ECT401', fullSyllabus: '...', modules: [] } ]
          },
          {
            id: 's8',
            name: 'Semester 8',
            subjects: [ { id: 'ect402', name: 'Optical Communication', code: 'ECT402', fullSyllabus: '...', modules: [] } ]
          },
        ]
      },
      {
        id: 'me',
        name: 'Mechanical Engineering',
        semesters: [
          {
            id: 's1', name: 'Semester 1', subjects: [
              { id: 'mat101', name: 'Linear Algebra and Calculus', code: 'MAT101', fullSyllabus: '...', modules: [] },
              { id: 'phy101', name: 'Engineering Physics', code: 'PHY101', fullSyllabus: '...', modules: [] }
            ]
          },
          {
            id: 's2', name: 'Semester 2', subjects: [
              { id: 'cyt100', name: 'Engineering Chemistry', code: 'CYT100', fullSyllabus: '...', modules: [] },
              { id: 'est100', name: 'Engineering Mechanics', code: 'EST100', fullSyllabus: '...', modules: [] }
            ]
          },
          { id: 's3', name: 'Semester 3', subjects: [ { id: 'met201', name: 'Mechanics of Solids', code: 'MET201', fullSyllabus: '...', modules: [] } ] },
          { id: 's4', name: 'Semester 4', subjects: [ { id: 'met202', name: 'Thermodynamics', code: 'MET202', fullSyllabus: '...', modules: [] } ] },
          { id: 's5', name: 'Semester 5', subjects: [ { id: 'met301', name: 'Fluid Mechanics', code: 'MET301', fullSyllabus: '...', modules: [] } ] },
          { id: 's6', name: 'Semester 6', subjects: [ { id: 'met302', name: 'Heat and Mass Transfer', code: 'MET302', fullSyllabus: '...', modules: [] } ] },
          { id: 's7', name: 'Semester 7', subjects: [ { id: 'met401', name: 'Machine Design', code: 'MET401', fullSyllabus: '...', modules: [] } ] },
          { id: 's8', name: 'Semester 8', subjects: [ { id: 'met402', name: 'Finite Element Analysis', code: 'MET402', fullSyllabus: '...', modules: [] } ] },
        ]
      },
      {
        id: 'ce',
        name: 'Civil Engineering',
        semesters: [
          {
            id: 's1', name: 'Semester 1', subjects: [
              { id: 'mat101', name: 'Linear Algebra and Calculus', code: 'MAT101', fullSyllabus: '...', modules: [] },
              { id: 'phy101', name: 'Engineering Physics', code: 'PHY101', fullSyllabus: '...', modules: [] }
            ]
          },
          {
            id: 's2', name: 'Semester 2', subjects: [
              { id: 'cyt100', name: 'Engineering Chemistry', code: 'CYT100', fullSyllabus: '...', modules: [] },
              { id: 'est100', name: 'Engineering Mechanics', code: 'EST100', fullSyllabus: '...', modules: [] }
            ]
          },
          { id: 's3', name: 'Semester 3', subjects: [ { id: 'cet201', name: 'Surveying', code: 'CET201', fullSyllabus: '...', modules: [] } ] },
          { id: 's4', name: 'Semester 4', subjects: [ { id: 'cet202', name: 'Structural Analysis I', code: 'CET202', fullSyllabus: '...', modules: [] } ] },
          { id: 's5', name: 'Semester 5', subjects: [ { id: 'cet301', name: 'Geotechnical Engineering I', code: 'CET301', fullSyllabus: '...', modules: [] } ] },
          { id: 's6', name: 'Semester 6', subjects: [ { id: 'cet302', name: 'Transportation Engineering I', code: 'CET302', fullSyllabus: '...', modules: [] } ] },
          { id: 's7', name: 'Semester 7', subjects: [ { id: 'cet401', name: 'Design of Concrete Structures II', code: 'CET401', fullSyllabus: '...', modules: [] } ] },
          { id: 's8', name: 'Semester 8', subjects: [ { id: 'cet402', name: 'Environmental Engineering II', code: 'CET402', fullSyllabus: '...', modules: [] } ] },
        ]
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        semesters: [
            {
                id: 's1', name: 'Semester 1', subjects: [
                    { id: 'mat101', name: 'Linear Algebra and Calculus', code: 'MAT101', fullSyllabus: '...', modules: [] },
                    { id: 'phy101', name: 'Engineering Physics', code: 'PHY101', fullSyllabus: '...', modules: [] }
                ]
            },
            {
                id: 's2', name: 'Semester 2', subjects: [
                    { id: 'cyt100', name: 'Engineering Chemistry', code: 'CYT100', fullSyllabus: '...', modules: [] },
                    { id: 'est100', name: 'Engineering Mechanics', code: 'EST100', fullSyllabus: '...', modules: [] }
                ]
            },
            { id: 's3', name: 'Semester 3', subjects: [ { id: 'eet201', name: 'Circuits and Networks', code: 'EET201', fullSyllabus: '...', modules: [] } ] },
            { id: 's4', name: 'Semester 4', subjects: [ { id: 'eet202', name: 'DC Machines and Transformers', code: 'EET202', fullSyllabus: '...', modules: [] } ] },
            { id: 's5', name: 'Semester 5', subjects: [ { id: 'eet301', name: 'Power Systems I', code: 'EET301', fullSyllabus: '...', modules: [] } ] },
            { id: 's6', name: 'Semester 6', subjects: [ { id: 'eet302', name: 'Control Systems', code: 'EET302', fullSyllabus: '...', modules: [] } ] },
            { id: 's7', name: 'Semester 7', subjects: [ { id: 'eet401', name: 'Power Electronics', code: 'EET401', fullSyllabus: '...', modules: [] } ] },
            { id: 's8', name: 'Semester 8', subjects: [ { id: 'eet402', name: 'Electric Drives', code: 'EET402', fullSyllabus: '...', modules: [] } ] },
        ]
      }
    ],
  },
];
