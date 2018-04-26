#ifndef TREENODE_H
#define TREENODE_H
#include <string>

using namespace std;

class TreeNode
{
private:
    TreeNode * left;
    TreeNode * right;
  //  string bitCode;
    unsigned frequency;
    unsigned char val;
public:
    
    //TreeNode();
    TreeNode(unsigned char val, unsigned frequency);
    
    //returns true if this node is a leaf node, returns false otherwise
    bool isLeafNode();
    
    //puts left as the left child and right as the right child of this node
    void join(TreeNode * left, TreeNode * right);
    
    TreeNode * getLeft(); //returns the left child
    TreeNode * getRight(); //returns the right child
    
    unsigned getFrequency(); //returns frequency member variable
    unsigned char getVal(); //returns val member variable
    
    
    //   string getBitCode();
    void buildCode(char *code);
    string getBitCode();
    
    ~TreeNode();
    
    
    //    TreeNode * getLeft(int c, string bc); //returns the left child
    //    TreeNode * getRight(int c, string bc); //returns the right child
    //    void nullLeft();
    //    void nullRight();
    
    
};


#endif
