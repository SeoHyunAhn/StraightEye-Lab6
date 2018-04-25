#ifndef ENCODER_H
#define ENCODER_H
//#include <string>
#include "HuffTree.h"
#include "MinHeap.h"
#include <list>

//1.) You build the frequency table using buildFrequencyTable()
//2.) Build a minheap using those frequencies
//3.) Build a Huffman Tree using that minheap
//4.) Generate the codes using the Huffman Tree
//5.) Using the codes and frequency table, construct the header and compressed text body.


using namespace std;

class Encoder
{
private:
    unsigned frequency_table[256];
    string filePath;
    HuffTree *ht;
    MinHeap *mh;
    short headerTF;
    //string bodyCode;
    // string headerTF;
    //string headerChar_Freq;
    
    // You need to add more class memeber and methods
public:
    //test_file_path is the input (decoded) file
    Encoder(string file_path);
    
    //Fills up the frequency_table array where frequency_table[i]
    //will contain the frequency of char with ASCII code i
    void buildFrequencyTable();
    
    int getFreqFrom_FT(unsigned char idx);
    
    //Builds the min head and run the encoding algorithm
    void encode();
    
    //Generates the encoded file and save it as output_file_path
    void writeEncodedFile(string output_file_path);
    
    void forCheking();
    
    void printBits(unsigned bitmap);
    
    void setHeaderTF(unsigned bitmap);
    
    void setBodyCode();
    
    void setHeaderChar(int bitmap);
    
    unsigned char getBinBody(string bodyCode);
    
    void setHeaderCharFreq(unsigned bitmap);
    
    unsigned long getLen(string str);
    
    ~Encoder();
};

#endif
