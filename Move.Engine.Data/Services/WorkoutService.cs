using Azure;
using Azure.AI.OpenAI;
using Microsoft.Extensions.Configuration;
using OpenAI.Chat;

namespace Move.Engine.Data.Services;
[Coalesce, Service]
public class WorkoutService
{
    private string _azureOpenAIKey;
    private string _azureopenAIEndpoint;
    public WorkoutService(IConfiguration configuration)
    {
        _azureOpenAIKey = configuration["AZURE_OPENAI_KEY"];
        if (string.IsNullOrEmpty(_azureOpenAIKey))
        {
            throw new Exception("Please set the AZURE_OPENAI_KEY environment variable.");
        }
        _azureopenAIEndpoint = configuration["AZURE_OPENAI_ENDPOINT"];
        if (string.IsNullOrEmpty(_azureopenAIEndpoint))
        {
            throw new Exception("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
        }
    }


    [Coalesce]
    public async Task<string> GenerateWorkout(string workoutRequest)
    {
        AzureKeyCredential credential = new AzureKeyCredential(_azureOpenAIKey);

        // Initialize the AzureOpenAIClient
        AzureOpenAIClient azureClient = new(new Uri(_azureopenAIEndpoint), credential);

        // Initialize the ChatClient with the specified deployment name
        ChatClient chatClient = azureClient.GetChatClient("gpt-4o");

        // Create a list of chat messages
        var messages = new List<ChatMessage>
          {
                new SystemChatMessage("You are an AI assistant for generating custom workouts."),
                new UserChatMessage(workoutRequest)
          };


        // Create chat completion options

        var options = new ChatCompletionOptions
        {
            Temperature = (float)0.7,
            MaxOutputTokenCount = 800,

            TopP=(float)0.95,
            FrequencyPenalty=(float)0,
            PresencePenalty=(float)0
        };

        // Create the chat completion request
        ChatCompletion completion = await chatClient.CompleteChatAsync(messages, options);


        // Print the response
        if (completion != null)
        {
            //return JsonSerializer.Serialize(completion, new JsonSerializerOptions() { WriteIndented = true });
            return completion.Content.First().Text;
        }
        else
        {
            return "No response received.";
        }
    }
}



