/*1 - get all statuses, not repeating, alphabetically ordered*/
select distinct name from tasks order by name asc;

/*2 - get the count of all tasks in each project, order by tasks count
descending*/
select count(tasks.id), projects.name from tasks right join projects on tasks.project_id = projects.id group by projects.name order by count(tasks.id) desc;

/*3 - get the count of all tasks in each project, order by projects
names*/
select count(tasks.id), projects.name from tasks right join projects on tasks.project_id = projects.id group by projects.name order by projects.name;

/*4 - get the tasks for all projects having the name beginning with
"N" letter*/
select * from tasks where name like 'n%';

/*5 - get the list of all projects containing the 'a' letter in the middle of
the name, and show the tasks count near each project. Mention
that there can exist projects without tasks and tasks with
project_id = NULL*/
select projects.id, projects.name, count(tasks.id) from tasks right join projects on tasks.project_id = projects.id where projects.name like '%a%' group by projects.name;

/*6 - get the list of tasks with duplicate names. Order alphabetically*/
select name, count(name) as count from tasks group by name having count > 1; 

/*7 - get list of tasks having several exact matches of both name and
status, from the project 'Garage'. Order by matches count*/
select tasks.name, status, count(tasks.name) as count from tasks inner join projects on tasks.project_id = projects.id where projects.name = 'Garage' group by tasks.name, status having count > 1; 

/*8 - get the list of project names having more than 10 tasks in status
'completed'. Order by project_id*/
select projects.name, count(status) as count from tasks inner join projects on tasks.project_id = projects.id where status = 1 group by projects.name having count > 10 order by project_id; 