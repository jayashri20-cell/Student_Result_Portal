// ================================
// STUDENT REGISTRATION
// ================================

const studentForm = document.getElementById("studentForm");


if (studentForm) {

    studentForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get student details

        const studentName =
            document.getElementById("studentName").value.trim();

        const registerNumber =
            document.getElementById("registerNumber").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const course =
            document.getElementById("course").value;


        // Get marks

        const htmlMark =
            Number(document.getElementById("htmlMark").value);

        const bootstrapMark =
            Number(document.getElementById("bootstrapMark").value);

        const javascriptMark =
            Number(document.getElementById("javascriptMark").value);


        // ================================
        // VALIDATION
        // ================================

        if (
            studentName === "" ||
            registerNumber === "" ||
            email === "" ||
            phone === "" ||
            course === ""
        ) {

            alert("Please fill all student details.");

            return;
        }


        // Phone validation

        if (!/^[0-9]{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit phone number.");

            return;
        }


        // Marks validation

        if (
            htmlMark < 0 ||
            htmlMark > 100 ||
            bootstrapMark < 0 ||
            bootstrapMark > 100 ||
            javascriptMark < 0 ||
            javascriptMark > 100
        ) {

            alert("Marks must be between 0 and 100.");

            return;
        }


        // ================================
        // CALCULATION
        // ================================

        const total =
            htmlMark +
            bootstrapMark +
            javascriptMark;


        const percentage =
            (total / 300) * 100;


        // PASS / FAIL

        let finalStatus;

        if (
            htmlMark >= 40 &&
            bootstrapMark >= 40 &&
            javascriptMark >= 40
        ) {

            finalStatus = "PASS";

        } else {

            finalStatus = "FAIL";
        }


        // ================================
        // STORE DATA
        // ================================

        const studentData = {

            name: studentName,

            registerNumber: registerNumber,

            email: email,

            phone: phone,

            course: course,

            html: htmlMark,

            bootstrap: bootstrapMark,

            javascript: javascriptMark,

            total: total,

            percentage: percentage.toFixed(2),

            status: finalStatus

        };


        sessionStorage.setItem(
            "studentData",
            JSON.stringify(studentData)
        );


        // ================================
        // GO TO RESULT PAGE
        // ================================

        window.location.href = "result.html";

    });

}


// ================================
// DISPLAY RESULT
// ================================

const resultName = document.getElementById("resultName");


if (resultName) {

    const savedData =
        sessionStorage.getItem("studentData");


    // If no data found

    if (!savedData) {

        alert("No student data found.");

        window.location.href = "index.html";

    } else {

        const data =
            JSON.parse(savedData);


        // Student details

        document.getElementById("resultName").textContent =
            data.name;

        document.getElementById("resultRegister").textContent =
            data.registerNumber;

        document.getElementById("resultEmail").textContent =
            data.email;

        document.getElementById("resultPhone").textContent =
            data.phone;

        document.getElementById("resultCourse").textContent =
            data.course;


        // Marks

        document.getElementById("resultHtml").textContent =
            data.html;

        document.getElementById("resultBootstrap").textContent =
            data.bootstrap;

        document.getElementById("resultJavascript").textContent =
            data.javascript;


        // Subject status

        document.getElementById("htmlStatus").textContent =
            data.html >= 40 ? "PASS" : "FAIL";

        document.getElementById("bootstrapStatus").textContent =
            data.bootstrap >= 40 ? "PASS" : "FAIL";

        document.getElementById("javascriptStatus").textContent =
            data.javascript >= 40 ? "PASS" : "FAIL";


        // Total and Percentage

        document.getElementById("totalMarks").textContent =
            data.total;

        document.getElementById("percentage").textContent =
            data.percentage + "%";


        // Final Result

        const finalResult =
            document.getElementById("finalResult");


        finalResult.textContent =
            "Final Result: " + data.status;


        if (data.status === "PASS") {

            finalResult.classList.add("pass");

        } else {

            finalResult.classList.add("fail");

        }

    }

}