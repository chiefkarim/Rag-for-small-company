
import httpx
import asyncio
import json

async def main():
    url = "http://localhost:8000/chat"
    payload = {"query": "Tell me a short story about a brave knight."}
    
    print(f"Connecting to {url}...")
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            async with client.stream("POST", url, json=payload) as response:
                if response.status_code != 200:
                    print(f"Error: {response.status_code}")
                    print(await response.aread())
                    return

                print("Receiving stream:")
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data_str = line[len("data: "):]
                        if data_str == "[DONE]":
                            print("\n[Stream finished]")
                            break
                        
                        try:
                            data = json.loads(data_str)
                            if "token" in data:
                                print(data["token"], end="", flush=True)
                            elif "error" in data:
                                print(f"\nError in stream: {data['error']}")
                        except json.JSONDecodeError:
                            print(f"\nFailed to decode: {data_str}")
    except Exception as e:
        print(f"\nConnection failed: {e}")

if __name__ == "__main__":
    asyncio.run(main())
