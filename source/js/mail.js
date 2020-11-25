function mail(user, domain, id) {
    const elem = document.getElementById(id);
    elem.innerHTML = user + '[at]' + domain;
    elem.onmouseover = undefined;
    elem.onclick = () => sendMail(user, domain);
}

function sendMail(user, domain) {
    const a = document.createElement('a');
    a.href = `mailto:${user}@${domain}`;
    a.click();
}
