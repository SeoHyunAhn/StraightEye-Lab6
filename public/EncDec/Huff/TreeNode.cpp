#include <iostream>
#include "TreeNode.h"
#include <string>


TreeNode::TreeNode(unsigned char getChar, unsigned int freq)
{
    val = getChar;
    frequency = freq;
   // bitCode = "";
    left = NULL;
    right = NULL;
    
    
}

unsigned  TreeNode::getFrequency()
{
    return frequency;
}
unsigned char TreeNode::getVal()
{
    return val;
}

bool  TreeNode::isLeafNode(){
    if(right == NULL && left == NULL){
        return true;
    }
    return false;
}

void TreeNode::join(TreeNode * lt, TreeNode * rt){
    right = rt;
    left = lt;
}

TreeNode * TreeNode::getLeft(){
    return left;
}
TreeNode * TreeNode::getRight(){
    return right;
}


TreeNode::~TreeNode(){
    if(this->left != NULL){
        delete this->left;
    }
    if(this->right != NULL){
        delete this->right;
    }
}

//void TreeNode::nullLeft(){
//    left = NULL;
//}
//void TreeNode::nullRight(){
//    right = NULL;
//}



//string TreeNode::getBitCode(){
//    // printf("@@@@@@@@@@@@@@     "); cout<<bitCode<<endl;
//    return bitCode;
//}


//void TreeNode::buildCode(char *code){
//
//    int i = 0;
//    while(code[i] != '\0'){
//        bitCode += code[i];
//        i++;
//    }
//
//}


//string bitCode;
//TreeNode * TreeNode::getLeft(int c, string bc){
//    if(c == 0){
//        bitCode = bc;
//    }
//    return left;
//}
//
//TreeNode * TreeNode::getRight(int c, string bc){
//    if(c == 1){
//        bitCode += bc;
//    }
//    return right;
//}
