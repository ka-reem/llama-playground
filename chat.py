import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client with Llama API details
client = OpenAI(
    api_key=os.environ.get("LLAMA_API_KEY"),
    base_url="https://api.llama.com/compat/v1/"
)

# Define the model to use
MODEL_NAME = "Llama-4-Maverick-17B-128E-Instruct-FP8" # Default model, can be changed

def main():
    """Main function to run the CLI chatbot."""
    print(f"Chatting with {MODEL_NAME}. Type 'quit' or 'exit' to end the conversation.")
    
    # Store conversation history
    messages = []

    while True:
        try:
            user_input = input("You: ")
            if user_input.lower() in ["quit", "exit"]:
                print("Goodbye!")
                break

            # Add user message to history
            messages.append({"role": "user", "content": user_input})

            # Call the Llama API via OpenAI client
            completion = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages,
            )

            # Get the response content
            ai_response = completion.choices[0].message.content
            print(f"AI: {ai_response}")

            # Add AI response to history
            messages.append({"role": "assistant", "content": ai_response})

        except EOFError: # Handle Ctrl+D
            print("Goodbye!")
            break
        except KeyboardInterrupt: # Handle Ctrl+C
            print("Goodbye!")
            break
        except Exception as e:
            print(f"An error occurred: {e}")
            # Optionally, decide if you want to clear history or break on error
            # messages = [] # Uncomment to clear history on error
            # break        # Uncomment to exit on error

if __name__ == "__main__":
    main()
