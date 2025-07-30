
import type { University } from '@/types';

export const universities: University[] = [
  {
    id: 'ktu',
    name: 'APJ Abdul Kalam Technological University (KTU)',
    programs: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering',
        schemes: [
          {
            id: '2019',
            name: '2019 Scheme',
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
            id: '2024',
            name: '2024 Scheme',
            semesters: [
              {
                id: 's1',
                name: 'Semester 1',
                subjects: [
                  {
                    id: 'cs24_101',
                    code: 'CSU101',
                    name: 'Computational Thinking & Programming',
                    fullSyllabus: `Module 1: Introduction to Computational Thinking.
Module 2: Python Basics.
Module 3: Control Flow and Functions.
Module 4: Data Structures in Python.
Module 5: File Handling and Modules.`,
                    modules: [
                      { title: 'Computational Thinking', content: 'Decomposition, Pattern Recognition, Abstraction, Algorithms.' },
                      { title: 'Python Basics', content: 'Variables, data types, operators, input/output.' },
                      { title: 'Control Flow', content: 'Conditional statements (if-else), loops (for, while), functions.' },
                      { title: 'Data Structures', content: 'Lists, tuples, dictionaries, and sets.' },
                      { title: 'File Handling', content: 'Reading from and writing to files. Using Python modules.' },
                    ],
                  },
                ],
              },
              {
                id: 's2',
                name: 'Semester 2',
                subjects: [
                  {
                    id: 'cs24_201',
                    code: 'CSU201',
                    name: 'Programming in C++',
                    fullSyllabus: `Module 1: Introduction to C++.
Module 2: Control Structures and Functions.
Module 3: Arrays and Pointers.
Module 4: Object-Oriented Programming Concepts.
Module 5: Inheritance and Polymorphism.`,
                    modules: [
                      { title: 'Introduction to C++', content: 'Basic syntax, variables, data types, operators.' },
                      { title: 'Control Structures', content: 'If-else, loops, switch-case. Functions and recursion.' },
                      { title: 'Arrays and Pointers', content: 'Working with arrays, understanding pointers and memory management.' },
                      { title: 'OOP Concepts', content: 'Classes, objects, encapsulation, constructors, destructors.' },
                      { title: 'Inheritance and Polymorphism', content: 'Implementing inheritance, virtual functions, and polymorphism.' },
                    ],
                  },
                ],
              },
              {
                id: 's3',
                name: 'Semester 3',
                subjects: [
                  {
                    id: 'cs24_301',
                    code: 'CSU301',
                    name: 'Data Structures & Algorithms',
                    fullSyllabus: `Module 1: Advanced Data Structures.
Module 2: Algorithm Design Techniques.
Module 3: Graph Algorithms.
Module 4: Complexity Classes.
Module 5: Advanced Topics.`,
                    modules: [
                      { title: 'Advanced Data Structures', content: 'Heaps, Balanced Trees (AVL, Red-Black), Tries.' },
                      { title: 'Algorithm Design', content: 'Divide and Conquer, Dynamic Programming, Greedy Algorithms.' },
                      { title: 'Graph Algorithms', content: 'Dijkstra\'s, Floyd-Warshall, Kruskal\'s, Prim\'s algorithms.' },
                      { title: 'Complexity', content: 'Analysis of algorithms, P, NP, and NP-Complete problems.' },
                      { title: 'Advanced Topics', content: 'String matching algorithms, computational geometry.' },
                    ],
                  },
                ],
              },
              {
                id: 's4',
                name: 'Semester 4',
                subjects: [
                  {
                    id: 'cs24_401',
                    code: 'CSU401',
                    name: 'Database Management Systems (2024)',
                    fullSyllabus: `Module 1: Modern Database Architectures.
Module 2: NoSQL Databases.
Module 3: Big Data and Cloud Databases.
Module 4: Advanced SQL and Query Optimization.
Module 5: Database Security.`,
                    modules: [
                      { title: 'Database Architectures', content: 'Distributed databases, data warehousing, OLAP.' },
                      { title: 'NoSQL Databases', content: 'Key-value stores, document databases, graph databases (e.g., MongoDB, Neo4j).' },
                      { title: 'Big Data', content: 'Introduction to Hadoop, Spark, and cloud database solutions.' },
                      { title: 'Query Optimization', content: 'Advanced indexing, query execution plans, performance tuning.' },
                      { title: 'Database Security', content: 'Access control, encryption, data privacy regulations.' },
                    ],
                  },
                ],
              },
              {
                id: 's5',
                name: 'Semester 5',
                subjects: [
                  {
                    id: 'cs24_501',
                    code: 'CSU501',
                    name: 'Operating Systems (2024)',
                    fullSyllabus: `Module 1: Modern OS Concepts.
Module 2: Concurrency and Parallelism.
Module 3: Virtualization and Cloud.
Module 4: Distributed Operating Systems.
Module 5: OS Security.`,
                    modules: [
                      { title: 'Modern OS Concepts', content: 'Microkernels, monolithic kernels, hybrid kernels.' },
                      { title: 'Concurrency', content: 'Multithreading, race conditions, advanced synchronization.' },
                      { title: 'Virtualization', content: 'Hypervisors, containers (Docker), cloud computing concepts.' },
                      { title: 'Distributed OS', content: 'Architecture, communication, and synchronization in distributed systems.' },
                      { title: 'OS Security', content: 'Modern security threats, secure boot, access control models.' },
                    ],
                  },
                ],
              },
              {
                id: 's6',
                name: 'Semester 6',
                subjects: [
                  {
                    id: 'cs24_601',
                    code: 'CSU601',
                    name: 'Computer Networks (2024)',
                    fullSyllabus: `Module 1: Software-Defined Networking (SDN).
Module 2: Network Functions Virtualization (NFV).
Module 3: Wireless and Mobile Networks.
Module 4: Network Security.
Module 5: IoT Networking.`,
                    modules: [
                      { title: 'SDN', content: 'Architecture, control plane, data plane, OpenFlow.' },
                      { title: 'NFV', content: 'Concepts, architecture, virtualized network functions.' },
                      { title: 'Wireless Networks', content: '5G, Wi-Fi 6, mobile IP, ad-hoc networks.' },
                      { title: 'Network Security', content: 'Firewalls, IDS/IPS, VPNs, modern cryptographic protocols.' },
                      { title: 'IoT Networking', content: 'Protocols (MQTT, CoAP), low-power WANs.' },
                    ],
                  },
                ],
              },
              {
                id: 's7',
                name: 'Semester 7',
                subjects: [
                  {
                    id: 'cs24_701',
                    code: 'CSU701',
                    name: 'AI and Machine Learning',
                    fullSyllabus: `Module 1: Foundations of AI & ML.
Module 2: Deep Learning.
Module 3: Natural Language Processing.
Module 4: Reinforcement Learning.
Module 5: AI Ethics and Governance.`,
                    modules: [
                      { title: 'Foundations', content: 'Advanced search algorithms, Bayesian networks.' },
                      { title: 'Deep Learning', content: 'CNNs, RNNs, Transformers, Generative Models (GANs, VAEs).' },
                      { title: 'NLP', content: 'Language models, sentiment analysis, machine translation.' },
                      { title: 'Reinforcement Learning', content: 'Q-learning, policy gradients, deep Q-networks.' },
                      { title: 'AI Ethics', content: 'Bias, fairness, accountability, and transparency in AI.' },
                    ],
                  },
                ],
              },
              {
                id: 's8',
                name: 'Semester 8',
                subjects: [
                  {
                    id: 'cs24_801',
                    code: 'CSU801',
                    name: 'Project and Seminar',
                    fullSyllabus: `Module 1: Project Ideation.
Module 2: Literature Review.
Module 3: Design and Implementation.
Module 4: Testing and Evaluation.
Module 5: Documentation and Presentation.`,
                    modules: [
                      { title: 'Project Ideation', content: 'Identifying a problem, defining scope and objectives.' },
                      { title: 'Literature Review', content: 'Researching existing solutions and technologies.' },
                      { title: 'Implementation', content: 'Developing the project based on the design.' },
                      { title: 'Evaluation', content: 'Testing the project and analyzing results.' },
                      { title: 'Presentation', content: 'Documenting the project and presenting the findings.' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        schemes: [
          {
            id: '2019',
            name: '2019 Scheme',
            semesters: [
              {
                id: 's1',
                name: 'Semester 1',
                subjects: [
                    { id: 'mat101', name: 'Linear Algebra and Calculus', code: 'MAT101', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] },
                    { id: 'phy101', name: 'Engineering Physics', code: 'PHY101', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] }
                ]
              },
              {
                id: 's2',
                name: 'Semester 2',
                subjects: [
                    { id: 'cyt100', name: 'Engineering Chemistry', code: 'CYT100', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] },
                    { id: 'est100', name: 'Engineering Mechanics', code: 'EST100', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] }
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
                id: 's4', name: 'Semester 4', subjects: [ { id: 'ect202', name: 'Analog Circuits', code: 'ECT202', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ]
              },
              {
                id: 's5', name: 'Semester 5', subjects: [ { id: 'ect301', name: 'Linear Integrated Circuits', code: 'ECT301', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ]
              },
              {
                id: 's6', name: 'Semester 6', subjects: [ { id: 'ect302', name: 'Digital Signal Processing', code: 'ECT302', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ]
              },
              {
                id: 's7', name: 'Semester 7', subjects: [ { id: 'ect401', name: 'Microwave Engineering', code: 'ECT401', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ]
              },
              {
                id: 's8', name: 'Semester 8', subjects: [ { id: 'ect402', name: 'Optical Communication', code: 'ECT402', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ]
              },
            ]
          },
          {
            id: '2024',
            name: '2024 Scheme',
            semesters: [
                { id: 's1', name: 'Semester 1', subjects: [ { id: 'ec24_101', name: 'Intro to ECE (2024)', code: 'ECU101', fullSyllabus: '...', modules: [] } ] },
                { id: 's2', name: 'Semester 2', subjects: [ { id: 'ec24_201', name: 'Electronic Devices & Circuits', code: 'ECU201', fullSyllabus: '...', modules: [] } ] },
                { id: 's3', name: 'Semester 3', subjects: [ { id: 'ec24_301', name: 'Analog Circuits', code: 'ECU301', fullSyllabus: '...', modules: [] } ] },
                { id: 's4', name: 'Semester 4', subjects: [ { id: 'ec24_401', name: 'Signals and Systems', code: 'ECU401', fullSyllabus: '...', modules: [] } ] },
                { id: 's5', name: 'Semester 5', subjects: [ { id: 'ec24_501', name: 'Digital Communication', code: 'ECU501', fullSyllabus: '...', modules: [] } ] },
                { id: 's6', name: 'Semester 6', subjects: [ { id: 'ec24_601', name: 'Digital Signal Processing', code: 'ECU601', fullSyllabus: '...', modules: [] } ] },
                { id: 's7', name: 'Semester 7', subjects: [ { id: 'ec24_701', name: 'VLSI Design', code: 'ECU701', fullSyllabus: '...', modules: [] } ] },
                { id: 's8', name: 'Semester 8', subjects: [ { id: 'ec24_801', name: 'Project Work', code: 'ECU801', fullSyllabus: '...', modules: [] } ] },
            ]
          }
        ]
      },
      {
        id: 'me',
        name: 'Mechanical Engineering',
        schemes: [
          {
            id: '2019',
            name: '2019 Scheme',
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
              { id: 's3', name: 'Semester 3', subjects: [ { id: 'met201', name: 'Mechanics of Solids', code: 'MET201', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's4', name: 'Semester 4', subjects: [ { id: 'met202', name: 'Thermodynamics', code: 'MET202', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's5', name: 'Semester 5', subjects: [ { id: 'met301', name: 'Fluid Mechanics', code: 'MET301', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's6', name: 'Semester 6', subjects: [ { id: 'met302', name: 'Heat and Mass Transfer', code: 'MET302', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's7', name: 'Semester 7', subjects: [ { id: 'met401', name: 'Machine Design', code: 'MET401', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's8', name: 'Semester 8', subjects: [ { id: 'met402', name: 'Finite Element Analysis', code: 'MET402', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
            ]
          },
          {
            id: '2024',
            name: '2024 Scheme',
            semesters: [
                { id: 's1', name: 'Semester 1', subjects: [ { id: 'me24_101', name: 'Intro to ME (2024)', code: 'MEU101', fullSyllabus: '...', modules: [] } ] },
                { id: 's2', name: 'Semester 2', subjects: [ { id: 'me24_201', name: 'Engineering Mechanics', code: 'MEU201', fullSyllabus: '...', modules: [] } ] },
                { id: 's3', name: 'Semester 3', subjects: [ { id: 'me24_301', name: 'Mechanics of Solids', code: 'MEU301', fullSyllabus: '...', modules: [] } ] },
                { id: 's4', name: 'Semester 4', subjects: [ { id: 'me24_401', name: 'Manufacturing Technology', code: 'MEU401', fullSyllabus: '...', modules: [] } ] },
                { id: 's5', name: 'Semester 5', subjects: [ { id: 'me24_501', name: 'Heat Transfer', code: 'MEU501', fullSyllabus: '...', modules: [] } ] },
                { id: 's6', name: 'Semester 6', subjects: [ { id: 'me24_601', name: 'Machine Design I', code: 'MEU601', fullSyllabus: '...', modules: [] } ] },
                { id: 's7', name: 'Semester 7', subjects: [ { id: 'me24_701', name: 'Industrial Engineering', code: 'MEU701', fullSyllabus: '...', modules: [] } ] },
                { id: 's8', name: 'Semester 8', subjects: [ { id: 'me24_801', name: 'Project Work', code: 'MEU801', fullSyllabus: '...', modules: [] } ] },
            ]
          }
        ]
      },
      {
        id: 'ce',
        name: 'Civil Engineering',
        schemes: [
          {
            id: '2019',
            name: '2019 Scheme',
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
              { id: 's3', name: 'Semester 3', subjects: [ { id: 'cet201', name: 'Surveying', code: 'CET201', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's4', name: 'Semester 4', subjects: [ { id: 'cet202', name: 'Structural Analysis I', code: 'CET202', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's5', name: 'Semester 5', subjects: [ { id: 'cet301', name: 'Geotechnical Engineering I', code: 'CET301', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's6', name: 'Semester 6', subjects: [ { id: 'cet302', name: 'Transportation Engineering I', code: 'CET302', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's7', name: 'Semester 7', subjects: [ { id: 'cet401', name: 'Design of Concrete Structures II', code: 'CET401', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
              { id: 's8', name: 'Semester 8', subjects: [ { id: 'cet402', name: 'Environmental Engineering II', code: 'CET402', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
            ]
          },
          {
            id: '2024',
            name: '2024 Scheme',
            semesters: [
                { id: 's1', name: 'Semester 1', subjects: [ { id: 'ce24_101', name: 'Intro to CE (2024)', code: 'CEU101', fullSyllabus: '...', modules: [] } ] },
                { id: 's2', name: 'Semester 2', subjects: [ { id: 'ce24_201', name: 'Surveying & Geomatics', code: 'CEU201', fullSyllabus: '...', modules: [] } ] },
                { id: 's3', name: 'Semester 3', subjects: [ { id: 'ce24_301', name: 'Mechanics of Solids', code: 'CEU301', fullSyllabus: '...', modules: [] } ] },
                { id: 's4', name: 'Semester 4', subjects: [ { id: 'ce24_401', name: 'Structural Analysis I', code: 'CEU401', fullSyllabus: '...', modules: [] } ] },
                { id: 's5', name: 'Semester 5', subjects: [ { id: 'ce24_501', name: 'Geotechnical Engineering I', code: 'CEU501', fullSyllabus: '...', modules: [] } ] },
                { id: 's6', name: 'Semester 6', subjects: [ { id: 'ce24_601', name: 'Design of Concrete Structures', code: 'CEU601', fullSyllabus: '...', modules: [] } ] },
                { id: 's7', name: 'Semester 7', subjects: [ { id: 'ce24_701', name: 'Design of Steel Structures', code: 'CEU701', fullSyllabus: '...', modules: [] } ] },
                { id: 's8', name: 'Semester 8', subjects: [ { id: 'ce24_801', name: 'Project Work', code: 'CEU801', fullSyllabus: '...', modules: [] } ] },
            ]
          }
        ]
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        schemes: [
          {
            id: '2019',
            name: '2019 Scheme',
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
                { id: 's3', name: 'Semester 3', subjects: [ { id: 'eet201', name: 'Circuits and Networks', code: 'EET201', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
                { id: 's4', name: 'Semester 4', subjects: [ { id: 'eet202', name: 'DC Machines and Transformers', code: 'EET202', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
                { id: 's5', name: 'Semester 5', subjects: [ { id: 'eet301', name: 'Power Systems I', code: 'EET301', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
                { id: 's6', name: 'Semester 6', subjects: [ { id: 'eet302', name: 'Control Systems', code: 'EET302', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
                { id: 's7', name: 'Semester 7', subjects: [ { id: 'eet401', name: 'Power Electronics', code: 'EET401', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
                { id: 's8', name: 'Semester 8', subjects: [ { id: 'eet402', name: 'Electric Drives', code: 'EET402', fullSyllabus: 'Syllabus content...', modules: [{title: 'Module 1', content: 'Content...'}] } ] },
            ]
          },
          {
            id: '2024',
            name: '2024 Scheme',
            semesters: [
              { id: 's1', name: 'Semester 1', subjects: [ { id: 'ee24_101', name: 'Intro to EEE (2024)', code: 'EEU101', fullSyllabus: '...', modules: [] } ] },
              { id: 's2', name: 'Semester 2', subjects: [ { id: 'ee24_201', name: 'Electric Circuit Theory', code: 'EEU201', fullSyllabus: '...', modules: [] } ] },
              { id: 's3', name: 'Semester 3', subjects: [ { id: 'ee24_301', name: 'Analog Electronics', code: 'EEU301', fullSyllabus: '...', modules: [] } ] },
              { id: 's4', name: 'Semester 4', subjects: [ { id: 'ee24_401', name: 'DC Machines & Transformers', code: 'EEU401', fullSyllabus: '...', modules: [] } ] },
              { id: 's5', name: 'Semester 5', subjects: [ { id: 'ee24_501', name: 'Power Systems I', code: 'EEU501', fullSyllabus: '...', modules: [] } ] },
              { id: 's6', name: 'Semester 6', subjects: [ { id: 'ee24_601', name: 'Control Systems', code: 'EEU601', fullSyllabus: '...', modules: [] } ] },
              { id: 's7', name: 'Semester 7', subjects: [ { id: 'ee24_701', name: 'Power Electronics', code: 'EEU701', fullSyllabus: '...', modules: [] } ] },
              { id: 's8', name: 'Semester 8', subjects: [ { id: 'ee24_801', name: 'Electric Drives', code: 'EEU801', fullSyllabus: '...', modules: [] } ] },
            ]
          }
        ]
      }
    ],
  },
];
