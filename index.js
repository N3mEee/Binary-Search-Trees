class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr = []) {
        this.arr = this.sort(arr);
        this.root = this.buildTree(this.arr);
    }

    buildTree(arr) {
        if (arr.length === 0) return null;

        const mid = Math.floor(arr.length / 2);
        const newNode = new Node(arr[mid]);
        newNode.left = this.buildTree(arr.slice(0, mid));
        newNode.right = this.buildTree(arr.slice(mid + 1));
        return newNode;
    }

    sort(arr) {
        const sortedArray = [...new Set(arr.sort((a, b) => a - b))];
        return sortedArray;
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(arr);
console.log(newTree);
prettyPrint(newTree.root);

//git test new ssh
