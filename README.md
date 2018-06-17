### Card-Shuffle-Deal-Test

### Requirement
Create a Node-JS program, and corresponding unit tests to ensure it is  
working correctly, that would:  
<p>1. Create a standard deck of playing cards</p>
<p>2. Shuffle the deck</p>
<p>3. Deal as many cards as possible to a number of players that would be  
specified by the program's user.</p>
  
Besides these basic requirements, any assumptions needed to design a  
solution can be made.  
  
### Assumptions
The following assumptions have been made:  
<p>1. The dealer assigns the 52 cards to players in a round robin method,  
ensuring all players receive an equal number of cards.</p>
<p>2. If the number of players do not exactly divide the deck, then the  
remaining cards are removed as unavailable by the dealer. E.g., if  
there are 7 players, each player will be dealt 7 cards, and the 3  
remaining cards will become unavailable.</p>
<p>3. The number of players range between 3 and 8.</p>
<p>4. The number of players are configured in a JSON file.</p>

### Dependencies
  
| Package         | Version |  
|:--------------- | -------:|  
| mocha           | 5.0.5   |  
| chai            | 4.1.2   |  
  
### Execution
To run this program, navigate to the root folder of the project on the target  
host and enter: ```npm test```
  
### Player Configuration
The number of players can be configured via a JSON configuration file  
(`userconf.json`) located the folder `tests/config` under the project  
root path.  
