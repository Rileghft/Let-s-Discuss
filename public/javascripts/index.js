/**
 * Created by fnsne on 2017/1/21.
 */

var discusses = {
    'num': '2',
    'discusses': [
        {
            'name': 'test',
            'launcher': 'Rileghft'
        },
        {
            'name': '123',
            'launcher': 'fnsne'
        }
    ]
};
var $history_container;
$(document).ready(function () {
    $history_container = $('.discuss-history-container');
    for(var i = 0 ; i < discusses.num; i++){
        append_discuss(discusses.discusses[i].name, discusses.discusses[i].launcher);
    }
});

function append_discuss(name, launcher) {
    let href_append = "`discuss/"+name+"`";
    let template = `
    <div class="discuss-history" onclick="location.href+=${href_append}" >
        <div class="discuss-name">${name}</div>
        <div class="discuss-launcher">${launcher}</div>
        </a>
    </div>`;
    $history_container.append(template);
}
