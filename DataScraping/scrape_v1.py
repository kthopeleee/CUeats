import requests
from bs4 import BeautifulSoup
import json
import re

# Fetch the webpage
url = "https://dining.columbia.edu/content/jjs-place-0"
response = requests.get(url)
response.raise_for_status()  
html_content = response.text

# Parse the HTML with BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Extract the JavaScript containing `menu_data`
script_tag = soup.find("script", string=re.compile("menu_data"))
if script_tag:
    menu_data_match = re.search(r"menu_data\s*=\s*`(.*?)`", script_tag.string, re.DOTALL)

    if menu_data_match:
        menu_data_raw = menu_data_match.group(1)  # Extract the JSON string
        
        print("Extracted menu_data_raw:")
        print(menu_data_raw[:500])  # Print the first 500 characters for debugging
        
        # Step 4: Clean the string
        menu_data_cleaned = (
            menu_data_raw
            .replace("\\'", "'")  # Fix escaped single quotes
            .replace("'", '"')    # Replace single quotes with double quotes
            .replace("\n", "")    # Remove newlines
            .strip()              # Remove leading/trailing whitespace
        )

        print("\nCleaned menu_data:")
        print(menu_data_cleaned[:500])  # Print the first 500 characters for debugging

        # Parse JSON
        try:
            menu_data = json.loads(menu_data_cleaned)  # Convert JSON string to Python object

            # Process and extract menu details
            for menu in menu_data:
                title = menu.get("title", "No Title")
                stations = menu.get("stations", [])

                print(f"\nMenu Title: {title}")
                for station in stations:
                    meals = station.get("meals_paragraph", [])
                    for meal in meals:
                        meal_title = meal.get("title", "No Meal Title")
                        allergens = ", ".join(meal.get("allergens", []))
                        prefs = ", ".join(meal.get("prefs", []))
                        print(f"  Meal: {meal_title}")
                        print(f"    Allergens: {allergens}")
                        print(f"    Preferences: {prefs}")
        except json.JSONDecodeError as e:
            print("Failed to parse JSON:", e)
    else:
        print("menu_data not found in the script tag.")
else:
    print("Script tag containing menu_data not found.")