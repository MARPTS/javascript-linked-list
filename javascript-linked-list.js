 
 
 // what is linked list ? why use link list and good for what ?  where can we use it ?
 // how many way can achieve the linked list ?

 // Linked List class  (single)
 function LinkedList() {
    // 内部的类: 节点类(内部构造函数)
    function Node(data){
        this.data = data;
        this.next = null;
    }
    // 
    this.head = null;
    this.length = 0;

    //1.append
    LinkedList.prototype.append = function (data) {
        var newNode = new Node(data);
        // 判断是否添加的是第一个节点
        if(this.length === 0){  
            this.head = newNode;
        }else {
            // 找得到最后一个节点
            var current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = newNode;
        }

        //3.length + 1
        this.length +=1;
    }

    //2.toString
    LinkedList.prototype.toString = function () {
        // 定义变量
        var current = this.head;
        var listString = '';
        //循环获取一个个的节点
        while(current){
            listString += current.data + ' ';
            current = current.next;
        }

        return listString;
    }

    // 3. insert
    LinkedList.prototype.insert = function (position, data) {
        //对position进行越界判断
        if(position < 0 || position > this.length) return false;

        // 根据data创建newNode
        var newNode = new Node(data);

        // 判断插入的位置是否是第一个
        if(position == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }else {
            var index = 0;
            var current = this.head;
            var previous = null;
            while(index ++ < position){
                previous = current;
                current = current.next;
            }

            newNode.next = current;
            previous.next = newNode;
        }

    // 4. length +1
    this.length += 1;

    return true;
    }

    //4.get
    LinkedList.prototype.get = function(position) {
        // 判断越界
        if(position < 0 || position >= this.length) return null;

        // 获取对应的data
        var current = this.head;
        var index = 0;
        while(index++ < position){
            current = current.next
        }
        return current.data;
    }

    // 5. indexOf
    LinkedList.prototype.indexOf = function (data) {
        //定义变量
        var current = this.head;
        var index = 0;
    
        //开始查找
        while(current){
            if(current.data == data){
                return index;
            }
            current = current.next;
            index +=1;
        }
    
        //找到最后没有找到,返回-1
        return -1;
    }

    //6, updata(position,element)
    LinkedList.prototype.updata = function (position,newData) {
        //判断越界
        if(position<0 || position >= this.length)  return null;

        //查找正确的节点
        var current = this.head;
        var index = 0;
        while (index++ < position){
            current = current.next;
        }
        // 将position位置点的node 的data修改成newData
        current.data = newData;
        return true;
    }

    //7. removeAt(position)
    LinkedList.prototype.removeAt = function (position) {
        // 越界判断
        if(position < 0 || position >= this.length) return null;

        // 判断是否删除的是第一个节点
        var current = this.head;
        if(position == 0){
            this.head = this.head.next;
        }else {
            var index =0;
            var previous = null;
            while(index ++ <position){
                previous = current;
                current = current.next;
            }

            // 前一个节点的next指向,current的next即可
            previous.next = current.next;
        }

        //length -1
        this.length -=1

        return current.data;
    }

    // 8.remove
    LinkedList.prototype.remove = function (data) {
        var position = this.indexOf(data);
        return this.removeAt(position);
    }

    // 9. isEmpty
    LinkedList.prototype.isEmpty = function(){
        return this.length === 0;
    }

    // 10.size()
    LinkedList.prototype.size = function () {
        return this.length;
    }
}

// test code
const linkedlist = new LinkedList();

// append and toString
linkedlist.append(1);
linkedlist.append(2);
linkedlist.append(3);
const string = linkedlist.toString();

// get
console.log(string); // 1 2 3
console.log(linkedlist.get(0)); // 1
console.log(linkedlist.get(1)); // 2
console.log(linkedlist.get(2)); // 3

// insert
linkedlist.insert(1,'insert');
console.log(linkedlist.toString()); // 1 insert 2 3

// indexOf
const index = linkedlist.indexOf('insert');
console.log(index); // 1

// updata
linkedlist.updata(1,'update');
console.log(linkedlist.toString()); // 1 update 2 3

// removeAt
console.log(linkedlist.length); // 4
linkedlist.removeAt(1);
console.log(linkedlist.length); // 3
console.log(linkedlist.toString()); // 1 2 3

linkedlist.insert(2,'insert'); // 1 2 insert 3
// remove
linkedlist.append(1);
console.log(linkedlist.length); // 5
linkedlist.remove(1);
console.log(linkedlist.length); // 4
console.log(linkedlist.toString()); // 2 insert 3 1

// isEmpty
console.log(linkedlist.isEmpty()); // false
linkedlist.removeAt(0)
console.log(linkedlist.toString());
linkedlist.removeAt(0)
console.log(linkedlist.toString());
linkedlist.removeAt(0)
console.log(linkedlist.toString());
linkedlist.removeAt(0)
console.log(linkedlist.toString());
console.log(linkedlist.isEmpty()); // true