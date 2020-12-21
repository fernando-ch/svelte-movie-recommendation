<script>
    export let movie
</script>
<div class="card">
    <span class="title">
        {movie.title}
    </span>
    <span class="stream">
        {movie.stream}
    </span>
</div>

<style>
    .card {
        position: relative;
        margin: 10px;
        display: flex;
        flex-direction: column;
        height: 50px;
        width: 220px;
        padding: 1.5em;
        border-radius: 16px;
        background: #4e326a;
        box-shadow: 0 0.1rem 3rem #000;
       }

    .title {
        display: block;
        font-weight: bold;
    }

    .stream {
        /*font-size: 0.7em;*/
    }
</style>