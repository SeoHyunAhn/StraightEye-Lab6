#include <iostream>
#include "Decoder.h"
#include "MinHeap.h"
#include "HuffTree.h"



Decoder::Decoder(string huff_file_path){
    
    filePath = huff_file_path;
    vNode = NULL;
    totalNum = 0;
    
    for(int i = 0; i <= 255; i++){
        frequency_table[i] = 0;
    }
    
    
    buildFrequencyTableFromFile();
    
    mh= new MinHeap();
    ht = new HuffTree(mh, frequency_table);
    vNode = ht->getRoot();
    
    
}

//Fills up the frequency_table array where frequency_table[i]
//will contain the frequency of char with ASCII code i
//This method will read the header of the encoded file to
//extract the chars and their frequency
void Decoder::buildFrequencyTableFromFile(){
    
    
    FILE *fs = fopen(&filePath[0],"rb");

    unsigned int c = 0;
    unsigned int d = 0;
    
    fread(&c,2,1,fs);
    unsigned long len = c;
    //printf("@@@@ %d\n",len);
    if(len > 255){                          // for edge case handing (val > 256)
        for(int i = 0; i < len; i++){
            fread(&c,1,1,fs);
            fread(&d,4,1,fs);
            frequency_table[c - 256] = d;
            totalNum += d;
           
        }
    }else{
        for(int i = 0; i < len; i++){
            fread(&c,1,1,fs);
            fread(&d,4,1,fs);
            frequency_table[c] = d;
            totalNum += d;
        }
        
    }
    fclose(fs);
    
}


//Creates a min-heap and builds the Huffman tree

void Decoder::decode(){}

//Writes the uncompressed file and save it as file_path
void Decoder::writeUncompressedFile(string file_path){
    
    FILE *fs = fopen(&filePath[0],"rb");
 
    unsigned int c = 0;
    unsigned int d = 0;
    
    fread(&c,2,1,fs);
    int uniqNum = c;
    
    for(int i = 0; i < uniqNum; i++){
        fread(&c,1,1,fs);
        fread(&d,4,1,fs);
    }
    
    
    FILE * pFile;
    string getBitFrom = "";
    
    pFile = fopen (&file_path[0], "w");
    
    while( fread(&c,1,1,fs)){
        
        int j = 0;
        
        // fread(&c,1,1,fs);
        getBitFrom = printBits(c);
        
        while(getBitFrom[j] != '\0'){
            if(getBitFrom[j] == '1'){
                vNode = vNode->getLeft();
                if(vNode->isLeafNode()){
                    //     printf("%c",vNode->getVal());
                    unsigned char tp = vNode->getVal();
                    fwrite (&tp , 1, 1, pFile);
                    vNode =ht->getRoot();
                    totalNum--;
                }
            }
            else{
                vNode = vNode->getRight();
                if(vNode->isLeafNode()){
                    //       printf("%c",vNode->getVal());
                    unsigned char tp = vNode->getVal();
                    fwrite (&tp , 1, 1, pFile);
                    vNode =ht->getRoot();
                    totalNum--;
                }
            }
            if(totalNum == 0){break;}
            // printf("@@@@ %d \n",totalNum);
            j++;
        }
        

        
    }
    
    //  fdd.close();
    fclose(fs);
    
    // outStream.close();
    fclose (pFile);
    
}

string Decoder::printBits(unsigned int bitmap)
{
    // Write Your Code Here
    
    int i = 0;
    string bit = "00000000";
    unsigned int div = bitmap;
    unsigned int mod = (div % 2);
    
    while(1){
        
        if(mod == 1){
            bit[7 - i] = '1';
        }
        
        div = (div / 2);
        mod = (div % 2);
        
        if(div == 0){
            break;
        }
        
        i++;
    }
    
    
    return bit;
    
}

void Decoder::forCheking(){
    printf("called!\n");
    for(int i = 0; i <= 255; i++){
        if(frequency_table[i] > 0){
            printf("val = %d freq = %d\n",i,frequency_table[i]);
        }
    }
}

Decoder::~Decoder(){
    delete ht;
    delete mh;
}
