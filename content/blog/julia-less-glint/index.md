+++
path = "2025/09/05/julia-less-glint"
date = 2025-09-05
title = "Tips for the Julia <code>startup.jl</code> file"
authors = ["Martin Kunz"]

description = """
Some small glints and tips for the <code>startup.jl</code> that I find useful when using Julia interactively in the REPL.
"""

[taxonomies]
tags = ["Julia", "glints", "REPL", "tip"]
categories = ["Programming"]

[extra]
updated = 2026-01-21
# toc = true
+++
I have lately spent some time switching between an editor, paper and the Julia REPL, which made me realize how much more
  pleasant I have made this workflow for myself by stuff I have in the startup file.

> [!NOTE]
**What is the `startup.jl` file?!**\
For those who are not accustomed with the concept of the startup file in Julia, briefly, it is a script that is run once
  you enter the REPL.
It is stored at `$JULIA_DEPOT_PATH/config/startup.jl` or if the `JULIA_DEPOT_PATH` environment variable is not set, the
  default on _GNU/UNIX_ is `$HOME/.julia/`.
Here you can find more about the
  [`startup.jl`](https://docs.julialang.org/en/v1/manual/command-line-interface/#Startup-file) file.


Some of the changes that I made may be useful to you as well!

# Loading Packages for Interactive Use Only
Most people use it for loading packages that they use often enough that they value of having the package functionality
  available at startup is higher than the price of the REPL startuptime.
The library packages that meet this criterium for me are
  [`BenchmarkTools`](https://juliaci.github.io/BenchmarkTools.jl/stable/) and [`Makie`](https://docs.makie.org/dev/). 
It is always a good idea when loading packages for interactive use to include them conditionally only when the session
  is _interactive_ with
```julia,name=~/.julia/config/startup.jl
try
    if isinteractive()
        using Makie
    end
catch e
    @warn "Error initializing Makie" exception = (e, catch_backtrace())
end
```
> [!NOTE]
The `try/catch` control sequence is here, since I switch between different versions of Julia and I do not always make
  sure that everything is installed.

This way you are only paying the expense when you actually need it and not when running scripts or generating
  documentation for example.

# Other Useful Packages
Non-library packages that may improve your experience with the Julia REPL when using it interactively which I also are
  important to me are these...

[`Revise`](https://timholy.github.io/Revise.jl/stable/)
: It has become more of a must have in the community and is also recommended by the official Julia documentation. It
manges the changes that you make in your loaded packages and allows the REPL environment to reflect changes that you
make in real time.

[`OhMyRepl`](https://kristofferc.github.io/OhMyREPL.jl/latest/)
: Features include syntax highlighting in your REPL, markdown syntax for documentation and fuzzy searching with
[`fzf`](https://github.com/junegunn/fzf) of the REPL history.

[`VimBindings`](https://caleb-allen.github.io/VimBindings.jl/)
: Enables editing the command line with modal Vim bindings.

# Additional Functions
It is also useful to define some functions that you can use for exploration and debugging purposes. 
For example, I have a `subtypetree` function which allows me to see all of the subtypes of a particular abstract type to
  decide on what interfaces I should use for my own implementations.

```julia-repl
julia> subtypetree(Integer)
Integer
  Bool
  GeometryBasics.OffsetInteger
  Signed
    BigInt
    Int128
    Int16
    Int32
    Int64
    Int8
  Unsigned
    UInt128
    UInt16
    UInt32
    UInt64
    UInt8
```
<details>
<summary>Definition of <code>subtypetree</code></summary>
<pre class="giallo z-code"><code data-lang="julia"><span class="giallo-l"><span class="z-keyword">function</span><span class="z-entity z-name"> subtypetree</span><span>(</span><span>roottype</span><span>,</span><span> level</span><span class="z-keyword">=</span><span class="z-constant">1</span><span>,</span><span> indent</span><span class="z-keyword">=</span><span class="z-constant">2</span><span>)</span></span>
<span class="giallo-l"><span>    level </span><span class="z-keyword">==</span><span class="z-constant"> 1</span><span class="z-keyword"> &amp;&amp;</span><span class="z-support"> println</span><span>(</span><span>roottype</span><span>)</span></span>
<span class="giallo-l"><span class="z-keyword">    for</span><span> s </span><span class="z-keyword">in</span><span class="z-support"> subtypes</span><span>(</span><span>roottype</span><span>)</span></span>
<span class="giallo-l"><span class="z-support">        println</span><span>(</span><span class="z-support">join</span><span>(</span><span class="z-support">fill</span><span>(</span><span class="z-punctuation z-definition z-string">"</span><span class="z-punctuation z-definition z-string"> "</span><span>,</span><span> level </span><span class="z-keyword">*</span><span> indent</span><span>)</span><span>)</span><span class="z-keyword"> *</span><span class="z-support"> string</span><span>(</span><span>s</span><span>)</span><span>)</span></span>
<span class="giallo-l"><span class="z-support">        subtypetree</span><span>(</span><span>s</span><span>,</span><span> level </span><span class="z-keyword">+</span><span class="z-constant"> 1</span><span>,</span><span> indent</span><span>)</span></span>
<span class="giallo-l"><span class="z-keyword">    end</span></span>
<span class="giallo-l"><span class="z-keyword">end</span></span></code></pre>
</details>

# Change the Pages for `@less`

> [!NOTE]
**What is this `@less` that you are talking about?**\
If you do not use `@less` and `@edit`, you should definitely check them out!
These are tools that allow you to inspect the source code of functions implemented in some package (or defined earlier
  within the REPL).
Usually when I have the editor and the REPL open and any of my calls to library functions have unexpected outputs,
  I would like to inspect what is happening in its implementation.
You could surely use `GoToImplemention` from the language server if you are within the editor context, but I find
  `@less` and `@edit` to be useful in the REPL as well.
Most importantly, I use this when I want to look up how some function is implemented in the Julia `Base` or in some
  external package, because I want to implement something similar myself.

Also you might want to integrate some tools that you use on your system and use them instead of the defaults. 
One nice enhancement that I have in this category is using `bat` instead of `less` as the pager for in the
  `InteractiveUtils.less` function.
You can achieve this by including the code
```julia,name=startup.jl
try
    if isinteractive()
        using InteractiveUtils
        function InteractiveUtils.less(file::AbstractString, line::Integer)
            run(`bat --paging=always --line-range $(line): $file`)
            nothing
        end
    end
catch e
    @warn "Error initializing InteractiveUtils" exception = (e, catch_backtrace())
end
```
in your `startup.jl` file. 
This allows me to switch context between reading code that is run and running the code while staying in the REPL using
  `@less` instead of `@edit` which opens the code in the terminal.
It gives you syntax highlighting of the output Julia source of the function that you are inspecting.

Imagine that you want to see how the `split` function is implemented from `Base`.
Perhaps you want to see if there is an iterator with the same behaviour and suspect that it would be present in the
  implementation.
For this reason, you call
```julia-repl
julia> @less split("a,b", ",")
```
From the default `InteractiveUtils.less` definition that uses the `less` (or the `$PAGER` environment variable) command
to page the output you can expect something similar to this:
<pre class="giallo z-code">
<code data-lang="plain" style='background-color:#24292E; color:#E1E4E8;'><span class="giallo-l"><span>function split(str::T, splitter;</span></span>
<span class="giallo-l"><span>               limit::Integer=0, keepempty::Bool=true) where {T&lt;:AbstractString}</span></span>
<span class="giallo-l"><span>    collect(eachsplit(str, splitter; limit, keepempty))</span></span>
<span class="giallo-l"><span>end</span></span>
<span class="giallo-l"></span>
<span class="giallo-l"><span># a bit oddball, but standard behavior in Perl, Ruby &amp; Python:</span></span></code>
</pre>

It has the correct output but it is not very pleasant to read.
You can imagine that you are analysing the implementation of a larger function... This would be quite a pain.

If you change the `InterativeUtils.less` function definition to use [`bat`](https://github.com/sharkdp/bat) as described
  above, you can expect something like this:
<pre class="giallo z-code">
<code style="background-color:#24292E; color:#E1E4E8;">File: <b>/home/kunzaatko/.julia/juliaup/julia-1.12.3+0.x64.linux.gnu/share/julia/base/strings/util.jl</b>
<span style='color:#cba6f7'>function</span><span style='color:#cdd6f4'> </span><span style='color:#89b4fa'>split</span><span style='color:#9399b2'>(</span><span style='color:#eba0ac'>str</span><span style='color:#94e2d5'>::</span><span style='color:#f9e2af'>T</span><span style='color:#9399b2'>,</span><span style='color:#eba0ac'> splitter</span><span style='color:#9399b2'>;</span>
<span style='color:#eba0ac'>               limit</span><span style='color:#94e2d5'>::</span><span style='color:#f9e2af'>Integer</span><span style='color:#94e2d5'>=</span><span style='color:#fab387'>0</span><span style='color:#9399b2'>,</span><span style='color:#eba0ac'> keepempty</span><span style='color:#94e2d5'>::</span><span style='color:#f9e2af'>Bool</span><span style='color:#94e2d5'>=</span><span style='color:#fab387'>true</span><span style='color:#9399b2'>)</span><span style='color:#cdd6f4'> </span><span style='color:#cba6f7'>where</span><span style='color:#cdd6f4'> </span><span style='color:#9399b2'>{</span><span style='color:#cdd6f4'>T</span><span style='color:#94e2d5'>&lt;:</span><span style='color:#f9e2af'>AbstractString</span><span style='color:#cdd6f4'>}</span>
<span style='color:#cdd6f4'>    collect</span><span style='color:#9399b2'>(</span><span style='color:#cdd6f4'>eachsplit</span><span style='color:#9399b2'>(</span><span style='color:#cdd6f4'>str, splitter; limit, keepempty</span><span style='color:#9399b2'>))</span>
<span style='color:#cba6f7'>end</span>

<span style='color:#9399b2'># a bit oddball, but standard behavior in Perl, Ruby &amp; Python:</span>
</code>
</pre>
which is way nicer to read... 

I hope you enjoyed this non-exhaustive view into the contents of my `startup.jl` and that you perhaps found something
  useful for your own that could make the beautiful experience of writing Julia code a little less frustrating...
