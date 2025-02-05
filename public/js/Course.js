function addCourse() {
    const jsonData = {
        name: document.getElementById("name").value,
        code: document.getElementById("code").value
    };

    if (!jsonData.name || !jsonData.code) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    // Validate course code: exactly 3 digits
    const codeRegex = /^\d{3}$/;
    if (!codeRegex.test(jsonData.code)) {
        document.getElementById("message").innerHTML = 'Course code must be exactly 3 digits!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    const request = new XMLHttpRequest();
    request.open("POST", "/add-course", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        const response = JSON.parse(request.responseText);
        if (response.message) {
            document.getElementById("message").innerHTML = response.message;
            document.getElementById("message").setAttribute("class", "text-danger");
        } else {
            document.getElementById("message").innerHTML = 'Added Course: ' + jsonData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");
            document.getElementById("name").value = "";
            document.getElementById("code").value = "";
        }
    };
    request.send(JSON.stringify(jsonData));
}
