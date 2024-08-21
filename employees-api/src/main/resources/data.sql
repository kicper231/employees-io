INSERT INTO employees (id, name, surname, hire_date, manager_id)
VALUES ('e65e0686-a0cd-4f57-87d7-dc96020b1714', 'John', 'Doe', '2023-01-15', NULL),
       ('e65e0686-a0cd-4f57-87d7-dc96020b1711', 'Jane', 'Smith', '2023-02-20', 'e65e0686-a0cd-4f57-87d7-dc96020b1714');

INSERT INTO skills (id, name, proficiency, employee_id)
VALUES ('d3b07384-40ac-41f7-b9a2-23f51dc3a23a', 'Java Programming', 1,
        'e65e0686-a0cd-4f57-87d7-dc96020b1714'),
       ('f1e2d9a7-85b4-4f1f-a2d4-22311c5f2b75', 'Project Management', 0,
        'e65e0686-a0cd-4f57-87d7-dc96020b1711');

INSERT INTO projects (id, name, description, employee_id)
VALUES ('a0e2b68c-4c21-4b9a-b1c3-2f5f5a4d57f8', 'Employee Management System',
        'Developing a system to manage employee.', 'e65e0686-a0cd-4f57-87d7-dc96020b1714'),
       ('b4f2c34b-3c18-4e2b-9a3f-3c5d8a4e5f47', 'Project Alpha', 'Leading project Alpha to success.',
        'e65e0686-a0cd-4f57-87d7-dc96020b1711');