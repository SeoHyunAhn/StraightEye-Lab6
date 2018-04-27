#include <iostream>
#include <fstream>
#include <string>
#include <stdio.h>
#include "Encoder.h"
#include "MinHeap.h"
#include "math.h"

Encoder::Encoder(string file_path){
    
    filePath = file_path;
    
    for(int i = 0; i <= 255; i++){
        frequency_table[i] = 0;
    }
    
    
    
    buildFrequencyTable();
    mh = new MinHeap();
    ht = new HuffTree(mh, frequency_table);
}

//Fills up the frequency_table array where frequency_table[i]
//will contain the frequency of char with ASCII code i


void Encoder::buildFrequencyTable() {
    
    
    //input_file_path = file_path;
    FILE *fs = fopen(&filePath[0],"rb");
    fseek(fs,0,SEEK_END);
    long len = ftell(fs);
    rewind(fs);
    unsigned char c;
    
    for(int i = 0; i < len; i++){
        fread(&c,1,1,fs);
        if(c>=0&&c<=255){
            frequency_table[c]+=1;
        }
        
    }
    
    fclose(fs);
    
}


unsigned long Encoder::getLen(string str){
    
    unsigned long i = 0;
    while(str[i] != '\0'){
        i++;
    }
    return i;
}

//Builds the min head and run the encoding algorithm

void Encoder::encode(){
    
    // setBodyCode();
    
}

unsigned char Encoder::getBinBody(string bodyCode){
    
    unsigned int val = 0;;
    for(int i = 0; i <= 7; i++){
        if(bodyCode[i] == '1'){
            val += (int)pow(2,7 - i);
        }
    }
    return val;
}



//Uninitialised value was created by a heap allocation
void Encoder::writeEncodedFile(string output_file_path){
    
    unsigned short totalFreq = 0;
    
    for(int i = 0; i <= 255; i++){
        if(frequency_table[i] > 0){
            totalFreq ++;
        }
    }
    
    //    ofstream outStream;
    //    outStream.open (output_file_path,ostream::binary);
    FILE * pFile = fopen (&output_file_path[0], "wb");
    
    //   outStream.write(reinterpret_cast<const char*>(&totalFreq), sizeof(short));
    fwrite (&totalFreq , 2, 1, pFile);
    
    for(int i = 0; i <= 255; i++){
        if(frequency_table[i] > 0){
            fwrite (&i , 1, 1, pFile);
            fwrite (&frequency_table[i] , 4, 1, pFile);
            
        }
    }
    
    unsigned char temp = 0;
  //  unsigned char a = 0;;
  //  char *ptr;
    
    
    FILE *fs = fopen(&filePath[0],"rb");
//    fseek(fs,0,SEEK_END);
//    long len = ftell(fs);
//    rewind(fs);
    unsigned char c = 0;;
    int tempIndex = 0;
    
   // for(int i = 0; i < len; i++){
    while(fread(&c,1,1,fs)){
        
      //  fread(&c,1,1,fs);
        string bodycode = ht->getCharCode(c);
        for(int j = 0; j < bodycode.length(); j++){
            
            unsigned char currentChar = bodycode[j];
            if(currentChar == '1'){
                temp = temp << 1;
                temp |= 1u;
                
            }else
                temp = temp << 1;
            
            tempIndex++;
            if(tempIndex == 8){
                fwrite(&temp,1,1,pFile);
                tempIndex = 0;
                temp = 0;
            }
            
            
        }
        
        
    }
    if(tempIndex %8 !=0){
        
        unsigned int bodyrestbit = temp;
        while(tempIndex %8 !=0){
            bodyrestbit = bodyrestbit << 1;
            tempIndex++;
        }
        fwrite(&bodyrestbit,1,1,pFile);
    }
    
    //outStream.put(a);
    // printf("@@@@  "); cout<<temp<<endl;
    
    //  fdd.close();
    fclose(fs);
    
    // outStream.close();
    fclose(pFile);
    
}



void Encoder::forCheking(){
    for(int i = 0; i <= 255; i++){
        if(frequency_table[i] > 0){
            printf("%d %d\n",i,frequency_table[i]);
        }
    }
}


Encoder::~Encoder(){
    delete mh;
    delete ht;
}


//int Encoder::getFreqFrom_FT(unsigned char idx){
//    return frequency_table[(int)idx];
//}

//void Encoder::buildFrequencyTable(){
//
//    for(int i = 0; i <= 255; i++){
//        frequency_table[i] = 0;
//    }
//
//    ifstream fd;
//    fd.open(filePath);
//     char c;
//
//    while (fd.read((char*)&c, 1))
//    {
//        unsigned char qq = (unsigned char)c;
//        // cout<<bodyCode<<endl;
//        if(qq >= 0 && qq <= 255){
//            frequency_table[qq]++;
//            //       bodyCode += c;
//        }
//    }
//
//    //  cout<<bodyCode<<endl;
//    fd.close();
//
//
//}


//void Encoder::setBodyCode(){
//    ifstream fd;
//    fd.open(filePath);
//    unsigned char c;
//
//
//    while (fd.read((char*)&c, 1))
//    {
//        if(c >= 0 && c <= 256){
//            bodyCode += ht->getCharCode(c);
//            // printf("%c\n",c);
//        }
//    }
//
//    fd.close();
//
//    unsigned additionalBodyCode = 8 - (getLen(bodyCode) % 8);
//
//    if(additionalBodyCode != 8){
//
//        for(int i = 0; i < additionalBodyCode; i++){
//            bodyCode += "0";
//        }
//
//    }
//
//    //  cout<<bodyCode<<endl;
//
//}
