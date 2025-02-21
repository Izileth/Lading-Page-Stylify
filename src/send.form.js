function sendToWhatsApp(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Monta a mensagem
    const whatsappMessage = `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`;

    // Codifica a mensagem para uso na URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Número de destino (substitua pelo número desejado)
    const phoneNumber = '5591993961874'; // Formato internacional sem o "+"

    // Redireciona para o link do WhatsApp
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}