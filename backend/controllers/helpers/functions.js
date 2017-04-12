
module.exports.getDayNumber = function(dayString) {
    var map = new Map();
    map.set("sunday", 0);
    map.set("monday", 1);
    map.set("tuesday", 2);
    map.set("wednesday", 3);
    map.set("thursday", 4);
    map.set("friday", 5);
    map.set("saturday", 6);
    return map.get(dayString.toLowerCase());
}