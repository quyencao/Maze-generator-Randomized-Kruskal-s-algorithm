function DisjointSet() {
    this.sets = [];
    this.add = function (set) {
        if(set instanceof Array){
            this.sets.push(set);
            return;
        }
        this.sets.push([set]);
    };
    this.union = function (element1, element2) {
        var index1 = _.findIndex(this.sets, function (set) {
           return _.includes(set, element1);
        });

        var index2 = _.findIndex(this.sets, function (set) {
            return _.includes(set, element2);
        });

        if(index1 !== index2) {
            this.sets.push(_.union(this.sets[index1], this.sets[index2]));
            _.pullAt(this.sets, [index1, index2]);
        }
    };
    this.check = function () {
        return this.sets.length === 1;
    };
    this.connected = function (element1, element2) {
        return _.some(this.sets, function (set) {
            return (_.includes(set, element1) && _.includes(set, element2));
        });
    };
    this.show = function () {
        console.log(this.sets);
    }
}