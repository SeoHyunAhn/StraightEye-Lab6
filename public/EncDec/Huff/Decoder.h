#ifndef DECODER_H
#define DECODER_H
#include "MinHeap.h"
#include "HuffTree.h"
#include "TreeNode.h"
#include <string>

using namespace std;



class Decoder
{
	private:
		unsigned frequency_table[256];
        string filePath;
        TreeNode *vNode;
        HuffTree *ht;
        MinHeap *mh;
    unsigned long totalNum;
		// You need to add more class memeber and methods

	public:
		//huff_file_path is the input (encoded) file that we 
		//want to decode
		Decoder(string huff_file_path);
        string printBits(unsigned int bitmap);
		//Fills up the frequency_table array where frequency_table[i]
		//will contain the frequency of char with ASCII code i			
		//This method will read the header of the encoded file to 
		//extract the chars and their frequency
		void buildFrequencyTableFromFile();

		//Creates a min-heap and builds the Huffman tree
		void decode();
        void forCheking();
		//Writes the uncompressed file and save it as file_path
		void writeUncompressedFile(string file_path);
    string buildBody(unsigned int bitmap);
		~Decoder();

};

#endif