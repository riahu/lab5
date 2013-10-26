$(function() {
    var emps = Employees.entries;
    sortObjArray(emps, 'last');
    render(emps);
    $(".sort-ui .btn").click(function() {
        var sortBtn = $(this);
        sortBtn.siblings('.active').removeClass('active');
        sortBtn.addClass('active');
        sortObjArray(emps, sortBtn.attr('data-sortby'));
        render(emps);
    });
});

function render(entries) {
    var template = $('.template');
    var adbook = $('.address-book');
        adbook.hide();
    adbook.empty();
    $.each(entries, function() {
        var transfer = template.clone();
        for (p in this) {
            if (p === 'pic') {
                transfer.find('.pic').attr({
                    src: this[p],
                    alt: 'Picture of ' + this['first'] + ' ' + this['last']
                });
            }
            else {
                transfer.find('.' + p).html(this[p]);
            }
        }
        transfer.removeClass('template');
        adbook.append(transfer);
    });
    adbook.fadeIn();
}

/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

