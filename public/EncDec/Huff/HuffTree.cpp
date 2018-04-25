#include <iostream>
#include "Encoder.h"
#include "stdio.h"

HuffTree::HuffTree(MinHeap *mh, unsigned *frequency_Table){
    
    vNode = NULL;
    
    for(int i = 0; i <= 255; i++){
        getC[i] = "";
    }
    
    ft = frequency_Table;
    buildMinHeap(mh);
    buildTree(mh);
    
}

void HuffTree::buildMinHeap(MinHeap *mh){
    
    
    for (int i = 0; i <= 255; i++){
        
        if(ft[i] > 0){
            TreeNode * n = new TreeNode(i, ft[i]);
            mh->insert(n);
        }
        
    }// delete all the TreeNode object in minHeap
    
    
}

//build a hoffman  tree  give a minheap
void HuffTree::buildTree(MinHeap * mh){
    
    while(mh->getSize() > 1){
        TreeNode *lt = mh->removeMin();
        TreeNode *rt = mh->removeMin();
        
        TreeNode *temp = new TreeNode(0 ,lt->getFrequency() + rt->getFrequency());
        temp->join(lt,rt);;
        
        mh->insert(temp);
    }
    //  mh->checkHeap();
    
    vNode = mh->removeMin();

   //   checkH_T(vNode);
    
    string qwe = "";
    generateCodes(vNode, qwe);
    
    
}


void HuffTree::generateCodes(TreeNode* node, string str){
    //cout << "str: " << str << endl;
    
    if(node->isLeafNode()){
        unsigned char c = node->getVal();
        getC[(int)c] = str;
  //      printf("!!!!! %d  %d\n",node->getVal(),node->getFrequency());
        return;
    }
    
    else {
        if (node->getLeft() != NULL)
            generateCodes(node->getLeft(), str + "1");
        
        if (node->getRight() != NULL)
            generateCodes(node->getRight(), str + "0");
    }
}


TreeNode * HuffTree::getRoot(){
    return vNode;
}

//returns huffman code from  the ascii code

string HuffTree::getCharCode(unsigned char c){
    return getC[c];
}


HuffTree::~HuffTree(){
    delete vNode;
}


//void HuffTree::forDeconstruction(TreeNode *node){
//
//    if(node == NULL) return;
//    
//    /* first delete both subtrees */
//    forDeconstruction(node->getLeft());
//    forDeconstruction(node->getRight());
//    
//    /* then delete the node */
//    delete node;
//    
////    TreeNode *temp = NULL;
////    
////        if((node->getLeft() != NULL || node->getRight() != NULL)){
////            temp = node;
////            forDeconstruction(node->getLeft());
////            temp->nullLeft();
////            forDeconstruction(node->getRight());
////            temp->nullRight();
////        }
////    
////    printf("@@@@ %d  %d\n",node->getVal(),node->getFrequency());
////    delete(node);
//    
//}


//void HuffTree::searchHF_Tree(TreeNode *node, string &getCode, int val){
//
//    if(node->getLeft() != NULL || node->getRight() != NULL){
//        searchHF_Tree(node->getLeft(), getCode, val);
//        searchHF_Tree(node->getRight(), getCode, val);
//    }
//
//    if((int)node->getVal() == val){
//        getCode = node->getBitCode();
//    }
//
//}

//void HuffTree::checkH_T(TreeNode *node){
//
//    if((node->getLeft() != NULL || node->getRight() != NULL)){
//        checkH_T(node->getLeft());
//        checkH_T(node->getRight());
//    }
//
//  //  if(node->getVal() != 0){
//       // printf(" val = %d   freq = %d  code =  ",node->getVal(),node->getFrequency());
//        printf("!!!!! %d  %d\n",node->getVal(),node->getFrequency());
//     //   cout<<node->getBitCode()<<endl;
//  //  }
//}


//void HuffTree::postTrav(TreeNode *node){
//    // printf("entered!\n");
//
//    if(node->getLeft() != NULL || node->getRight() != NULL){
//        postTrav(node->getLeft());
//        postTrav(node->getRight());
//    }
//
//}


//void HuffTree::testing(string &str, char*bitCode){
//
//    int i = 0;
//
//    while(bitCode[i] != '\0'){str += bitCode[i]; i++;}
//}

//generate codes by traversing the huffman tree
//and store them in an internal data structure (array of strings for example)
//void HuffTree::generateCodes(TreeNode *node, char *bitCode, int level){
//
//    if(node->getLeft() != NULL || node->getRight() != NULL){
//        level++;
//        bitCode[level] = '1';
//        generateCodes(node->getLeft(), bitCode, level);
//        bitCode[level] = '0';
//        generateCodes(node->getRight(), bitCode, level);
//        bitCode[level] = '\0';
//    }
//
//
//    node->buildCode(bitCode);
//    getC[node->getVal()] = node->getBitCode();
//
//}
//a = 001  b= 110
//returns root of the tree



