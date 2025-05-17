# Claude Integration Setup

This guide explains how to connect Lithi to Claude via the Anthropic API.

## Prerequisites

1. An Anthropic API account
2. An API key from https://console.anthropic.com/

## Setup Instructions

### 1. Get Your Anthropic API Key

1. Go to https://console.anthropic.com/
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-ant-`)

### 2. Configure Environment Variables

#### For Local Development

Add to your `.env.local` file:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
```

#### For Production (Vercel)

1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to Environment Variables
4. Add a new variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
   - Environment: Production (and optionally Preview/Development)

### 3. Verify the Integration

1. Visit your customer portal
2. Go to the Chat with Lithi page
3. Send a message like "Hello" or "Tell me about your battery solutions"
4. You should receive a response from Claude

## How It Works

1. When a user sends a message in the Lithi chat:
   - The message is sent from the browser to `/api/chat/claude`
   - The API route uses the Anthropic SDK with your API key
   - Claude generates a response based on the system prompt
   - The response is sent back to the browser

2. System Prompt: Claude is instructed to act as Lithi, a battery technology assistant who helps with:
   - Finding battery solutions
   - Order placement and tracking
   - Technical specifications
   - Pricing information
   - Customer support

3. Fallback: If the API key is not configured or there's an error, the system falls back to mock responses.

## Security

- The API key is never exposed to the client side
- All Claude API calls are made from the server-side API route
- The API key is stored securely in environment variables

## Troubleshooting

If Lithi is not responding with Claude:

1. Check that your API key is correctly set in the environment variables
2. Verify the API key starts with `sk-ant-`
3. Check the browser console for any errors
4. Check the server logs for API errors
5. Ensure you have credits in your Anthropic account

## Model Selection

The integration currently uses `claude-3-haiku-20240307` for fast, cost-effective responses. You can change this in `/src/app/api/chat/claude/route.ts` if needed:

- `claude-3-opus-20240229` - Most capable, more expensive
- `claude-3-sonnet-20240229` - Balanced performance
- `claude-3-haiku-20240307` - Fastest, most affordable (current)

## Cost Considerations

- Claude API usage is billed per token
- Haiku model is the most cost-effective
- Monitor your usage at https://console.anthropic.com/
- Consider implementing rate limiting for production use