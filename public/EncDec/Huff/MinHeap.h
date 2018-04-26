#ifndef MINHEAP_H
#define MINHEAP_H

#include "TreeNode.h"
#include <vector>
#include <stdio.h>

using namespace std;


class MinHeap
{
private:
    vector<TreeNode*> heap;
public:
    MinHeap();
    TreeNode * removeMin(); //returns root of heap
    void insert(TreeNode * val); //adds element to heap
    void upward();
    void downward();
    void toTop(TreeNode * a, TreeNode * b);
    void test(){
        //        printf("called!");
        //        mSwap(&heap[getSize() - 1],&heap[0]);
        //     //   toTop(&heap[30],&heap[0]);
        //         heap.pop_back();
    }
    void mSwap(int a, int b);
    
//    bool isEmpty(){
//        return heap.empty();
//    }
    
    bool greater(int i, int j);
    void checkHeap();
    int getSize(); //returns size of heap
    ~MinHeap();
};

#endif
