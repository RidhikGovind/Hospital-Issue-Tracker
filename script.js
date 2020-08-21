let issues = JSON.parse(localStorage.getItem('issues')) || [];

        function fetchIssues() {
            

            let issueList = document.getElementById('issuesList');

            console.log(issues); //this should return null in the first round !

            
            issuesList.innerHTML = '';

            for (let i = 0; i < issues.length; i++) {
                let id = issues[i].id;
                let desc = issues[i].description;
                let severity = issues[i].severity;
                let service = issues[i].service;
                let assignedTo = issues[i].assignedTo;
                let status = issues[i].status;

                issuesList.innerHTML +=
                    '<div class="issue-jumbotron jumbotron">' +
                    '<h6>Issue Id:' + id + '</h6>' +
                    '<p><span class="badge badge-pill badge-info">' + status + '</span><p>' +
                    '<h3>' + desc + '</h3>' +
                    '<p> ' + ' <span class="fas fa-user-injured"></span>  ' + severity +
                    '  <span class="fas fa-procedures"></span>  ' + service +
                    '  <span class="fas fa-stethoscope"></span>  ' + assignedTo +
                    ' </p>' +
                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a>  ' +
                    '  <a href="#" class="btn btn-danger" onclick="setStatusDelete(\'' + id + '\')">Delete</a>' +
                    '</div>';


            }
        }



        function saveIssue(e) {
            
            let issueId = chance.guid();
            let issueDesc = document.getElementById('issueDescInput').value;
            let issueSeverity = document.getElementById('issueSeverityInput').value;
            let issueService = document.getElementById('issueServiceInput').value;
            let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
            let issueStatus = 'Open';


            //creating an 'issue' object to store these input values into

            let issue = {
                id: issueId,
                description: issueDesc,
                severity: issueSeverity,
                service: issueService,
                assignedTo: issueAssignedTo,
                status: issueStatus
            }

            //we are now checking if '.getItem' returns null or not
            //if it returns 'null' then a new array issues[] is created and object 'issue' is passed to it and converted into JSON string
            //else - parse the array to JS object, push the new object and then convert it back into JSON string
            if (localStorage.getItem('issues') == null) {
                issues = [];
                issues.push(issue); //pushing obj into array

                localStorage.setItem('issues', JSON.stringify(issues)); //stringifying arrray
            } else {
                issues = JSON.parse(localStorage.getItem('issues'));
                issues.push(issue);
                localStorage.setItem('issues', JSON.stringify(issues));
            }

            document.getElementById('issueInputForm').reset();

            fetchIssues();

            e.preventDefault();

        }

        document.getElementById('issueInputForm').addEventListener('submit', saveIssue);



        function setStatusClosed(id) {
            let issue = JSON.parse(localStorage.getItem('issues'));
            
            for (let i = 0; i < issues.length; i++) {
                if (issues[i].id == id) {
                    issues[i].status = 'Closed';
                }
            }

            localStorage.setItem('issues', JSON.stringify(issues)); //*&^%$#@!@#$%^&*&^%   BEWARE: THE SECOND ISSUES IS THE ARRAY ! YES WE ARE CONVERTING THE ARRAY ADN NOT  THE VARIABLE 'ISSUES' !@#$%^&*())(*&^%$#@!)

            fetchIssues(); //for updating the issuesList again

        }

        function setStatusDelete(id) {
           
            let issue = JSON.parse(localStorage.getItem('issues'));

            for (let i = 0; i < issues.length; i++) {
                if (issues[i].id == id) {
                    console.log(id);
                    issues.splice(i, 1);
                }
            }

            localStorage.setItem('issues', JSON.stringify(issues));

            fetchIssues();
        }