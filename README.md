# javascript-linked-list
#### 链表
##### 链表的优势
- 不同于数组,链表中的元素在内存中不必是连续的空间
- 链表的每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(有些语言称为指针或者链接)组成
- 相对于数组,链表有一些优点
    - 内存空间不是必须连续的,可以充分利用计算机的内存,实现灵活的内存动态管理
    - 链表不必在创建时就确定大小,并且大小可以无限的延伸下去
    - 链表在插入和删除数据时,时间复杂度可以达到O(1) 相对数组效率高很多
- 相对数组,链表有一些缺点:
    - 链表访问任何一个位置的元素时, 都需要从头开始访问(无法跳过第一个元素访问任何一个元素)
    - 无法通过下标直接访问元素,需要从头一个个访问, 知道找到对应的元素
 
##### 链表到底是什么?
-   什么是链表?
    - 链表类似于火车: 有一个火车头, 火车头会链接一个节点,节点上有乘客(类似于数据),并且这个节点会链接下一个节点,以此类推
    - head 链表头
    - 节点由两部分组成 next 指向下一个节点, data是节点数据
    - 最后一节点 next 指向 null
 
##### 链表结构的封装
- 代码解析:
    - 封装LinkedList 的类,用于标识我们的链表结构(和java中的链表同名,不同java中的这个类是一个双向链表)
    - 在LinkedList类中有一个Node类,用于封装每一个节点上的信息(和优先级队列的封装一样)
    - 链表中我们保存两个属性,一个是链表的长度,一个是链表中第一个节点
    ```
     // 封装链表类(构造函数)
    function LinkedList() {
        // 内部的类: 节点类(内部构造函数)
        function Node(data){
            this.data = data;
            this.next = null;
        }
        // 属性
        this.head = null;
        this.length = 0;
    }
    ```
 
##### 链表常见操作
- append(element): 向列表尾部添加一个新的项
- insert(position,element): 向列表的特定位置插入一个新的项
- get(position):获取对应位置的元素
- indexOf(element):返回元素在列表中的索引,如果列表中没有改元素则返回-1
- upddate(position):修改某个位置的元素
- removeAt(position):从列表的特定位置移除一项
- remove(element): 从列表中移除一项
- isEmpty(): 如果链表中不包含任何元素,返回true,如果链表长度大于0则返回fasle
- size(): 返回链表包含的元素个数,与数组的length属性类似
- toString(): 由于列表项使用了Node类,就需要重写继承自JavaScript对象默认的toString方法,让其只输出元素的值
 
###### append操作封装
- 向链表尾部追加数据可能有两种情况:
    - 链表本身为空,新添加的数据时唯一的节点
    - 链表不为空,需要向其他及诶按后面追加节点
    ```
    //1.追加方法
    LinkedList.prototype.append = function (data) {
        //1.创建新的节点
        var newNode = new Node(data);
        // 2.判断是否添加的是第一个节点
        if(this.length ==0){   //2.1是第一个节点
            this.head = newNode;
        }else { //2.2不是第一个节点
            // 找得到最后一个节点
            var current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = newNode;
        }
 
        //3.length + 1
        this.length +=1;
    ```
 
###### toString方法
- 该方法比较简单,主要是获取每一个元素
- 还是从head开头,因为获取链表的任何元素都必须从第一个节点开头
- 循环遍历每一个节点,并且去除其中的element,拼接成字符串
- 将最终字符串返回
```
//2.toString方法
LinkedList.prototype.toString = function () {
    // 1. 定义变量
    var current = this.head;
    var listString = '';
    //2.循环获取一个个的节点
    while(current){
        listString += current.data + ' ';
        current = current.next;
    }
 
    return listString;
}
```
 
###### insert方法
```
// 3. insert方法
LinkedList.prototype.insert = function (position, data) {
        //1.对position进行越界判断
        // -100    4 - 100
        if(position < 0 || position > this.length) return false;
 
        // 2.根据data创建newNode
        var newNode = new Node(data);
 
        // 3. 判断插入的位置是否是第一个
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
```
- 在任意位置插入数据
- 情况1: 插入position = 0 的位置
- 情况2: position =2


    ```
    //判断插入位置是否是第一个
    if(position == 0){
        newNode.next = this.head;
        this.head = newNode;
    }else {//情况2
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
    ```
 
###### get(position) 方法
```
//4.get方法
LinkedList.prototype.get = function(position) {
    // 判断越界
    if(position < 0 || position >= this.length) return null;
 
    // 2.获取对应的data
    var current = this.head;
    var index = 0;
    while(index++ < position){
        current = current.next
    }
    return current.data;
}
```
###### indexOf 方法
```
    // 5. indexOf方法
    LinkedList.prototype.indexOf = function (data) {
    //1.定义变量
    var current = this.head;
    var index = 0;
 
    //2.开始查找
    while(current){
        if(current.data == data){
            return index;
        }
        current = current.next;
        index +=1;
    }
 
    //3.找到最后没有找到,返回-1
    return -1;
    }
```
 
###### update(position,element)方法
```
//6, updata(position,element)方法
LinkedList.prototype.updata = function (position,newData) {
    //1.判断越界
    if(position<0 || position >= this.length)  return null;
 
    //2,查找正确的节点
    var current = this.head;
    var index = 0;
    while (index++ < position){
        current = current.next;
    }
    // 3.将position位置点的node 的data修改成newData
    current.data = newData;
    return true;
}
```
 
###### removeAt(position)方法
```
//7. removeAt(position)方法
LinkedList.prototype.removeAt = function (position) {
    // 1.越界判断
    if(position < 0 || position >= this.length) return null;
 
    // 2.判断是否删除的是第一个节点
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
 
    //3. length -1
    this.length -=1
 
    return current.data;
}
```

###### remove(element)方法
- 从列表中删除一项
```
// 8.remove 方法
LinkedList.prototype.remove = function (data) {
    var position = this.indexOf(data);
    return this.removeAt(position);
}
```
###### isEmpty 方法
```
// 9. isEmpty 方法
LinkedList.prototype.isEmpty = function(){
        return this.length == 0;
}
```

###### size() 方法
```
// 10.size() 方法
LinkedList.prototype.size = function () {
    return this.length;
}
```
##### 单向链表
- 只能从头遍历到尾或者从尾遍历到头(一般从头到尾
- 也就是链表相连的过程是单向的
- 实现的原理是上一个链表中有一个指向下一个的引用
###### 单向链表有一个比较明显的缺点
 - 我们可以很轻松的到达下一个节点,但是回到前一个节点是很难的,但是实际开发中,经常会遇到需要回到上一个节点的情况

##### 双向链表
- 既可以从头遍历到尾,有可以从尾遍历到头
- 也就是链表相连的过程是双向的,一个节点既有向前链接的引用,也有一个向后链接的引用
- 双向链表可以有效的解决单向链表中提到的问题

###### 双向链表有什么缺点?
 - 每次在插入或删除某个节点时,需要处理四个引用,而不是两个,实现起来要困难一些
- 并且相比于单向链表,必然占用内存空间更大一些
- 但是这些缺点和我们使用起来的方便程度相比, 是微不足道的

###### 双向链表图解


- 双向链表的特点
    - 可以使用一个head和一个tail分别指向头部和尾部的节点
    - 每个节点都由三部分组成: 前一个节点的指针(prev)/ 保存的元素(item)/ 后一个节点的指针(next)
    - 双向链表的第一个节点的prev是null
    - 双向链表的最后的节点的next 是null

###### 封装双向链表
```
// 封装双向链表
function DoublyLinkedList() {
    // 内部类 : 节点类
    function Node(data){
        this.data = data;
        this.prev = null;
        this.next = null;
    }
    // 属性
    this.head = null ;
    this.tail = null ;
    this.length = 0;

    // 常见的操作: 方法
}

```

###### 双向链表常见操作
- append(element): 向列表尾部添加一个新的项
- insert(position,element): 向列表的特定位置插入一个新的项
- get(position):获取对应位置的元素
- indexOf(element):返回元素在列表中的索引,如果列表中没有改元素则返回-1
- upddate(position):修改某个位置的元素
- removeAt(position):从列表的特定位置移除一项
- remove(element): 从列表中移除一项
- isEmpty(): 如果链表中不包含任何元素,返回true,如果链表长度大于0则返回fasle
- size(): 返回链表包含的元素个数,与数组的length属性类似
- toString(): 由于列表项使用了Node类,就需要重写继承自JavaScript对象默认的toString方法,让其只输出元素的值
- forwardString() : 返回正向遍历的节点字符串形式
- backwordString(): 返回反向遍历的节点字符串形式

# 未完待续。。。。
