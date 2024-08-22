from fireworks.client import Fireworks
import os
import json


client = Fireworks(api_key=os.getenv("FIREWORKS_API_KEY"))
response = client.chat.completions.create(
    model="accounts/fireworks/models/llama-v3p1-8b-instruct",
    messages=[{
        "role": "user",
        "content": "what is the capital of australia",
    }],
)

chatgpt_response = response.choices[0].message.content

# Output the response as JSON
print(json.dumps({"response": chatgpt_response}))
