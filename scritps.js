        let update = false;

        function appendRow(e) {
            e.preventDefault();
            if (!update) {
                let myform = new FormData(e.target);
                let count = 0;
                let fname;
                let tr = document.createElement('tr');
                for (let item of myform.entries()) {
                    count++;
                    console.log(item);
                    if (item[0] == 'fname') {
                        fname = item[1];
                        continue;
                    } else if (item[0] == 'lname') {
                        let td = document.createElement('td');
                        td.innerHTML = `${fname} ${item[1]}`;
                        tr.appendChild(td);
                        continue;
                    }
                    let td = document.createElement('td');
                    td.innerHTML = item[1];
                    tr.appendChild(td);
                }
                if (count < 5) {
                    let td = document.createElement('td');
                    td.innerHTML = 'No';
                    tr.appendChild(td);
                }
                let edit = document.createElement('td');
                let editbtn = document.createElement('button');
                editbtn.innerHTML = 'Edit';
                editbtn.onclick = editForm;
                edit.appendChild(editbtn);
                tr.appendChild(edit);
                let del = document.createElement('td');
                let delbtn = document.createElement('button');
                delbtn.innerHTML = 'Delete';
                delbtn.onclick = deleteInfo;
                del.appendChild(delbtn);
                tr.appendChild(del);
                let tbody = document.querySelector('tbody');
                tbody.appendChild(tr);
            } else {
                let editTr = document.getElementById('toEdit');
                let replaceTd = editTr.querySelectorAll('td');
                let fname = document.querySelector('[name="fname"]').value;
                let lname = document.querySelector('[name="lname"]').value;
                let email = document.querySelector('[name="email"]').value;
                let gender = document.querySelector('[name="gender"]').value;
                let recent = document.querySelector('[name="recent"]').checked ? 'Yes' : 'No';
                replaceTd[0].innerHTML = `${fname} ${lname}`;
                replaceTd[1].innerHTML = `${email}`;
                replaceTd[2].innerHTML = `${gender}`;
                replaceTd[3].innerHTML = `${recent}`;
                update = false;
                editTr.removeAttribute('id');
                document.querySelector('[type="submit"]').innerHTML = "Submit";
            }

            e.target.reset();
        }

        function deleteInfo(e) {
            e.target.parentElement.parentElement.remove();
        }

        function editForm(e) {
            update = true;
            e.target.parentElement.parentElement.setAttribute('id', 'toEdit');
            let allTd = e.target.parentElement.parentElement.querySelectorAll('td');
            console.log(allTd);
            let fname = allTd[0].innerHTML.split(' ')[0];
            let lname = allTd[0].innerHTML.split(' ')[1];
            let email = allTd[1].innerHTML;
            let gender = allTd[2].innerHTML;
            let recent = allTd[3].innerHTML;
            document.querySelector('[name="fname"]').value = fname;
            document.querySelector('[name="lname"]').value = lname;
            document.querySelector('[name="email"]').value = email;
            document.querySelector('[name="gender"]').value = gender;
            document.querySelector('[name="recent"]').checked = recent == "Yes" ? true : false;
            document.querySelector('[type="submit"]').innerHTML = "Update";
        }
    