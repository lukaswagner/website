function show(user, domain, id) {
    const elem = document.getElementById(id);
    elem.innerHTML = user + '[at]' + domain;
    elem.onmouseover = undefined;
    elem.onclick = () => send(user, domain);
}

function send(user, domain) {
    const a = document.createElement('a');
    a.href = `mailto:${user}@${domain}`;
    a.click();
}

window.mail = {
    show,
    send
}
