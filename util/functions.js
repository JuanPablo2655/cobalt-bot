var getInitials = function (string) {
    var initials = "";
    var names = string.split(' ');
    for (n = 0; n < names.length; n++) {
        initials += names[n].substring(0, 1).toUpperCase();
    }
    return initials;
};