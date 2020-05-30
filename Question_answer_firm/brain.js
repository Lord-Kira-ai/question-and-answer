(function () {
    const AskQuestion = document.querySelector("#question-button");
    const billboard = document.querySelector(".billboard");
    const cancel_billboard = document.querySelector("#cancel-button");
    const submit_button = document.querySelector("#submit-button");
    const overlay = document.querySelector(".overlay");
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");
    const questionList = document.querySelector(".Question-list");
    // const buttons = document.querySelector(".flex");

    let QuestionData = [];
    let id = 1;

    function Question(id, title, answer) {
        this.id = id;
        this.title = title;
        this.answer = answer;
    }

    function Main_process() { };
    const collect_data = new Main_process();

    Main_process.prototype.AppendData = function (element, questionobj) {
        // console.log(element,questionobj)
        let newdiv = document.createElement('div');
        // newdiv.style.width = "20%"
        // newdiv.style.border="3px solid red"
        newdiv.setAttribute('class', 'card');

        newdiv.innerHTML = `
        <div class="card-header">
            <h3 class="card-title"><i class="far fa-smile-beam"></i> ${questionobj.title}</h3>
        </div>
        <div class="card-body">
            <p class="card-text d-none">${questionobj.answer}</p>
            <div class="links"><a class="edit_link" href="#">Show Text</a> / <a class="hide_link" href="#">Hide Text</a></div>
            <div class="flex">
                <button id="edit" type="button" class="btn btn-warning"><i class="fas fa-edit"></i> Edit</button>
                <button id="delete" type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </div>
     `;

        element.appendChild(newdiv);
    }

    Main_process.prototype.clearfield = function (question, answer) {
        question.value = "";
        answer.value = "";
    }

    questionList.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.classList.contains('edit_link')) {
            console.log(e.target.parentElement.previousElementSibling.classList.remove('d-none'))
        }
        if (e.target.classList.contains('hide_link')) {
            console.log(e.target.parentElement.previousElementSibling.classList.add('d-none'))
        }
        if (e.target.id === 'edit') {
            let parent_element = e.target.parentElement.parentElement.parentElement;
            // console.log(parent_element.children[0].firstElementChild.textContent)
            question.value = parent_element.children[0].firstElementChild.textContent;
            answer.value = parent_element.children[1].firstElementChild.textContent;
            billboard.classList.remove('d-none');
            overlay.classList.add('active');
            
            questionList.removeChild(parent_element);

        }
        else if (e.target.id === 'delete') {
            let parent_element = e.target.parentElement.parentElement.parentElement;
            questionList.removeChild(parent_element);
        }
    })

    submit_button.addEventListener('click', function () {
        // console.log("Hello,world");

        let questionValue = question.value;
        let answerValue = answer.value;
        if (question.value === "" && answer.value === "") {
            // alert("enter some data");
            let feedback = document.querySelector(".error");
            feedback.classList.add('alert','alert-danger');
            feedback.style.cssText = "transform: translateY(100px); transition: transform 500ms ease-in;";
            overlay.style.backgroundColor = "rgb(255, 162, 162);"
            setTimeout(() => {
                feedback.style.cssText = "transform: translateY(-400px); transition: transform 500ms ease-in;";
                overlay.style.backgroundColor = "rgba(0, 0, 0,0.3);"
            }, 3000);
            
        }
        else {
            let question_temp = new Question(id, questionValue, answerValue);
            // console.log(question_temp);
            QuestionData.push(question_temp);
            id++;
            collect_data.AppendData(questionList, question_temp);
            collect_data.clearfield(question, answer)
            // collect_data
            // console.log(QuestionData);
        }
    })

    AskQuestion.addEventListener('click', function () {
        billboard.classList.remove('d-none');
        overlay.classList.add('active');
    })

    cancel_billboard.addEventListener('click', function () {
        billboard.classList.add('d-none');
        overlay.classList.remove('active');
    })
}

)()