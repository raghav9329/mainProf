/*
 * Mark Atkinson
 * atkinson_mark@yahoo.com
 * 12/17/2015   
 * 
 */
package hashMap_Test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;
import java.util.Map;

public class MyHashMap extends HashMap {
	//private static final long serialVersionUID = 1L;
	
	public MyHashMap(int size){
		//System.out.println("From within the constructor with size = " +size);
	}// end of Constructor

	public MyHashMap(){
		//System.out.println("From within the constructor with NO ARGS");
	}// end of Constructor
	
	public int mySize(){
		return this.size();
	}
	
	public boolean set(String key, Double value){
	//	System.out.println("Enter Key " +key +" and value " +value);
		this.put(key, value);
		
		if (this.containsKey(key))
			return true;
		//else			
		return false;
	}// end boolean set()
	

/* **********************************************************
 * get(key) - 
 * return the value associated with the 
 * given key, or null if no value is set.
 * 
 ***********************************************************/
	public Double myGet(String key){
		//System.out.println("fromWithinMyHashMap__myGet() ");
		if (this.containsKey(key))
			return (Double) this.get(key);
		
		return null;
	}// end myGet
	
	
	
/*
 * boolean delete(key) - 
 * delete the value associated with the given key,
 * returning a boolean indicating whether the value was found.	
 * 
 * Object value = map.remove(key); 
 * System.out.println("Following value is removed from Map: " + value);
 */
	public boolean myDelete(String key){
		if (this.containsKey(key)) {
			this.remove(key);
			return true;
		}
		return false;
	}
	
	
/* float load() - 
 * return a float value representing the 
 * load factor ( (items in hash map)/(size of hash map) ) of the data structure.
 * 	
 */
	
	public float myLoad(){
		
		Set set = this.entrySet();
		Iterator iterator = set.iterator();
		int count = 1;
		while (iterator.hasNext()){
			count++;
			if (count >= 100){
				System.out.println("Looping too much: breaking");
				break;
				
			}	
		}
	System.out.println("debug: count == " +count);
	System.out.println("debug: size == " +this.mySize());
	
	return (float)count/this.mySize();
	}
	
}//end class MyHashMap extends HashMap


/*


The solution should be delivered in one class (or your language's equivalent) 
that provides the following functions:

constructor(size) - return an instance of the class with pre-allocated 
space for the appropriate number of objects

boolean set(key, value) - stores the given key/value pair in the hash map. 
Returns a boolean value indicating success / failure of the operation.

get(key) - return the value associated with the given key, or null if no value is set.

boolean delete(key) - delete the value associated with the given key, 
returning a boolean indicating whether the value was found.

float load() - return a float value representing the 
load factor ( (items in hash map)/(size of hash map) ) of the data structure.

Since the size of the data structure is fixed, 
this should never be greater than 1. If your language 
provides a built-in hashing function for strings 
(ex. hashCode in Java or __hash__ in Python) you are welcome to use that. 
If not, you are welcome to do something naive, or use 
something you find online with proper attribution.

Include any tests you write associated with your work.

*/