const scriptURL = "https://script.google.com/home/projects/1Bw4ydSqVXI83X5p-koLTYqroZ65dHVBrujnc6_exo_lGnw6anLBny7A8/"; // Вставь сюда URL Google Apps Script

document.getElementById("reviewForm").addEventListener("submit", submitReview);

function submitReview(event) {
    event.preventDefault(); // Остановить стандартное поведение формы

    const name = document.getElementById("name").value;
    const rating = document.querySelector("input[name='rating']:checked")?.value; // Проверяем, выбрана ли оценка
    const review = document.getElementById("review").value;

    if (!name || !rating || !review) {
        alert("Будь ласка, заповніть всі поля!");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rating", rating);
    formData.append("review", review);

    fetch(scriptURL, {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log("Відповідь сервера:", data);
        if (data.trim() === "OK") {
            alert("Дякуємо за відгук!");
            document.getElementById("reviewForm").reset();
        } else {
            alert("Помилка при надсиланні відгуку.");
        }
    })
    .catch(error => {
        console.error("Помилка:", error);
        alert("Помилка з'єднання. Спробуйте ще раз.");
    });
}
