using Assignment.Services.StoryServices;
using Assignment.Test.Story.Service;

namespace Assignment.Test.Stories.Service;

public sealed class StoryServiceTest
{
    public class StoryItemTest
    {
        /// <summary>
        /// Should Return Story Items If Greater Than Zero
        /// </summary>
        [Fact]
        public async Task Should_Return_Story_Items_If_Greater_Than_Zero()
        {
            //Given
            var StoryService = Substitute.For<IStoryService>();
            StoryService sut = new StoryServiceFixture().WithStoryService(StoryService);
            //When

            //When
            var result = (await sut.GetStoryDetails(200)).Count();

            //Then
            result.Should().BeGreaterThan(0);
        }
    }
}
