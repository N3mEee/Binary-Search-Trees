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

    insert(data, root = this.root) {
        if (root === null) return new Node(data);
        if (root.data < data) {
            root.right = this.insert(data, root.right);
        } else {
            root.left = this.insert(data, root.left);
        }
        return root;
    }

    #minValue(root) {
        let minv = root.key;
        while (root.left != null) {
            minv = root.left.key;
            root = root.left;
        }
        return minv;
    }

    delete(data, root = this.root) {
        if (root === null) return root;
        if (root.data < data) root.right = this.delete(data, root.right);
        else if (root.data > data) root.left = this.delete(data, root.left);
        else {
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;
            root.data = this.#minValue(root.right);
            root.right = this.delete(data, root.right);
        }
        return root;
    }

    find(data, root = this.root) {
        const node = root;
        if (node === null) return null;
        if (node.data !== data) {
            return node.data < data ? this.find(data, node.right) : this.find(data, node.left);
        }
        return node;
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
prettyPrint(newTree.root);
console.log(newTree.find(7));
