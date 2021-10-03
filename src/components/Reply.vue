<template>
  <div class="item">
    <div class="ui comments">
      <div class="ui container">
        <div class="comment">
          <a class="avatar">
            <img src="../assets/logo.png">
          </a>
          <div class="content">
            <a class="author">Tom Lukic</a>
            <div class="text">
              This will be great for business reports. I will definitely download this.
            </div>
            <div class="actions">
              <a class="reply">Reply</a>
              <a class="like">Like</a>
              <a class="forward">Forward</a>
            </div>
          </div>
          <div class="content display-reply">
            <a>show 3 replies<i class="angle down icon"></i></a>
          </div>
        </div>
    </div>
      <!-- second attempt
      <div class="ui horizontal link list">
        <div class="item">
          <a class="ui right aligned avatar image">
            <img src="../assets/logo.png">
          </a>
        </div>
        <div class="item">
          <div class="content"><a href="#" class="header">Tom</a></div>
        </div>
        <div class="item">
          <i class="calendar icon"></i>2021-2-20
        </div>
      </div>
      <div class="text" style="font-size: large">good</div>
      <div class="ui mini right aligned horizontal link list">
        <div class="item">
          <div class="ui labeled button">
            <div class="mini ui button">
              <i class="heart icon"></i> Like
            </div>
            <a class="ui basic label">
              2,048
            </a>
          </div>
        </div>
        <div class="item">
          <div class="ui labeled button" tabindex="0">
            <div class="mini ui button">
              <i class="reply icon"></i> Reply
            </div>
            <a class="ui basic label">
              2,048
            </a>
          </div>
        </div>
        <div class="item">
          <div class="ui labeled button" tabindex="0">
            <div class="mini ui button">
              <i class="share icon"></i> Share
            </div>
            <a class="ui basic label">
              2,048
            </a>
          </div>
        </div>

      </div>-->

      <!-- first attempt
      <div class="ui stackable grid">
        <div class="three wide column">
          <a class="ui right aligned avatar image">
            <img src="../assets/logo.png">
          </a>
        </div>
        <div class="thirteen wide column">
          <div class="ui horizontal link list">
            <div class="item">
              <div class="content"><a href="#" class="header">Tom</a></div>
            </div>
            <div class="item">
              <i class="calendar icon"></i><div class="date">2021-2-20</div>
            </div>
          </div>
          <div class="text">good</div>
          <div class="ui mini right aligned horizontal link list">
            <div class="item">
              <div class="ui labeled button" tabindex="0">
                <div class="ui button">
                  <i class="heart icon"></i> Like
                </div>
                <a class="ui basic label">
                  2,048
                </a>
              </div>
            </div>
            <div class="item">
              <div class="ui labeled button" tabindex="0">
                <div class="ui button">
                  <i class="reply icon"></i> Reply
                </div>
                <a class="ui basic label">
                  2,048
                </a>
              </div>
            </div>
            <div class="item">
              <div class="ui labeled button" tabindex="0">
                <div class="ui button">
                  <i class="share icon"></i> Share
                </div>
                <a class="ui basic label">
                  2,048
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    -->

    </div>
  </div>
</template>
<script>
export default {

name: "Reply",
  data(){
    return{
      showReply:false,
    }
  }
}
</script>

<style scoped>

.display-reply {
  margin-top: 5px;
}
</style>