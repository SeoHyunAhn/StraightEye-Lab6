#define ileft(p) (2*(p)+1)
#define iright(p) (2*(p)+2)
#define iparent(ch) (((ch)-1)/2)
#include <iostream>
#include <climits>
#include "MinHeap.h"
#include <vector>



//implement the methods in MinHeap.h

MinHeap::MinHeap()
{
 //vextor check
    
}


void MinHeap::insert(TreeNode * val)
{
    
    // apply upheap. Swap parent and child atating at inserted
    // node up until we reach root or not necessary.
    heap.push_back(val);
    int child = (int)heap.size() - 1;
    int parent = iparent(child);
    while ( child > 0) {
        if (heap[child]->getFrequency() >= heap[parent]->getFrequency()){
            // No need to swap. Stop upheap
            break;
        }

        mSwap(child,parent);
        
        child = parent;
        parent = iparent(child);
    } // while
    
}

int MinHeap::getSize()
{
    return (int)heap.size();
}

void MinHeap::mSwap(int  a, int b){
    TreeNode *temp = heap[a];
    heap[a] = heap[b];
    heap[b] = temp;
}

//void MinHeap::toTop(TreeNode * a, TreeNode * b){
//    *a = *b;
//}

TreeNode * MinHeap::removeMin()
{
    
    if(getSize() == 0){return NULL;}
    
    if(getSize() == 1){
        heap.pop_back();
        return heap[0];
    }
    
    // returns minimum key after removing key from heap. assert(n>0);
    // Get min key at index 0
    TreeNode *minkey = heap[0];//new TreeNode(heap[0].getVal(),heap[0].getFrequency());
    //  TreeNode *minkey = &heap[0];
    int n = (int)getSize();
    
    if (n == 0){
        // heap is empty. No need to fix heap.
        return minkey;
    }
    n--;
    // Move last element in heap to the top
    mSwap(0, n);
    heap.pop_back();
    // Fix heap doing down-heap
    int parent = 0;
    int left = ileft(parent);
    int right = iright(parent);
    
    while ( left < n) {
        // Determine smallest child
        int minChild = left;
        if ((right < n) && (heap[right]->getFrequency() < heap[left]->getFrequency())) {
            minChild = right;
        }
        else if ((right < n) && (heap[right]->getFrequency() == heap[left]->getFrequency())) {
            minChild = left;
        }
        // Check if we need to swap
        if ( heap[parent]->getFrequency() <= heap[minChild]->getFrequency()) {
            // NO need to swap;
            break;
        }
  
        mSwap(minChild,parent);
        // continue going downheap
        parent = minChild;
        left = ileft(parent);
        right = iright(parent);
    } // while
    
    
    return minkey;
    
    // return NULL;
}

void MinHeap::checkHeap(){
    
    for(int i = 0; i < heap.size(); i++){
        printf("idx : %d   val: %c   frq = %d\n",i,heap[i]->getVal(),heap[i]->getFrequency());
//        if(heap[i]->isLeafNode()){
//            printf("true!\n");
//        }
    }
    
}

MinHeap::~MinHeap(){

}
