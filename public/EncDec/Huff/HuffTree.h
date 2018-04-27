#ifndef HUFFTREE_H
#define HUFFTREE_H
#define MAXCODELENGTH 256
#define BYTESIZE 8
#include "MinHeap.h"
#include "TreeNode.h"
#include <string>

using namespace std;

class HuffTree
{
private:
    //Add class members and methods
    TreeNode *vNode;
    unsigned *ft;
    string getC[256];
    
public:
    HuffTree(MinHeap *mh, unsigned *frequency_Table);
    
    //build a hoffman  tree  give a minheap
    void buildTree(MinHeap *mh);
    
    void buildMinHeap(MinHeap *mh);
    //generate codes by traversing the huffman tree
    //and store them in an internal data structure (array of strings for example)
   // void generateCodes(TreeNode *node, char *bitCode, int level);
    
    //returns root of the tree
    TreeNode * getRoot();
    
    void generateCodes(TreeNode* node, string str);
    
    //returns huffman code from  the ascii code
    string getCharCode(unsigned char c);
   // void searchHF_Tree(TreeNode *node,string &getCode,int val);
   // void testing(string &str, char *bitCode);
    
    //void postTrav(TreeNode *node);
    
    void checkH_T(TreeNode *node);
    
    //void forDeconstruction(TreeNode *node);
    
    ~HuffTree();
    
};


#endif
