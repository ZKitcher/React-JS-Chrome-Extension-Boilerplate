if (document.getElementById('content') === null) {
    const content_entry_point = document.createElement('div');
    let reactJS_script = document.createElement('script');

    content_entry_point.id = 'content';
    reactJS_script.src = 'content.bundle.js';

    content_entry_point.appendChild(reactJS_script);

    document.querySelector("body").appendChild(content_entry_point);
}
