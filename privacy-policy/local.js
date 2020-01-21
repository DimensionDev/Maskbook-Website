window.addEventListener('load', function () {
    document.querySelector('#layers-nav').innerHTML = `<div>
        <div>
            <span><a href="../../">Maskbook</a></span> /
            <span><a href="../">Privacy Policy</a></span> /
            <span>${document.body.getAttribute('data-policy-for')}</span>
        </div>
    </div>`;
});
