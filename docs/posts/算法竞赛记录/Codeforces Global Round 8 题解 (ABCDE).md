---
title: Codeforces Global Round 8 题解 (ABCDE)
date: 2020-06-19 10:02:00
permalink: /pages/9b3c1b/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## A. C+=

每次小的那个 += 大的那个。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int a,b,n;
void Solve(){
    cin>>a>>b>>n;
    for(int i=0;;i++){
        if(a<b)swap(a,b);
        if(a>n){cout<<i<<endl; return;}
        b+=a;
    }
}
signed main(){
    int T; cin>>T;
    while(T--)Solve();
    return 0;
}
```

## B. Codeforces Subsequences

首先能想到，答案应该是类似 `cccooodddeeefffooorrrccceeesss` 的形式，并且连续 c, o, d, ... 的个数应该尽可能接近。

因此每次找最少的那个连续字母，并添加这个字母。

- 解释一下为什么要“尽可能接近”。假设有 3 个 f 和 4 个 r，如果我添加一个 r，那么当前 subsequences 个数会乘以 $\dfrac 5 4$，如果增加一个 f 就会乘以 $\dfrac 4 3$，后者方案更优。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int k;
vector<int> a;
void Solve(){
    cin>>k;
    a.assign(10,1); int s=1;
    repeat(i,0,inf){
        if(s>=k)break;
        i%=10;
        s/=a[i];
        a[i]++;
        s*=a[i];
    }
    repeat(i,0,a[0])cout<<'c';
    repeat(i,0,a[1])cout<<'o';
    repeat(i,0,a[2])cout<<'d';
    repeat(i,0,a[3])cout<<'e';
    repeat(i,0,a[4])cout<<'f';
    repeat(i,0,a[5])cout<<'o';
    repeat(i,0,a[6])cout<<'r';
    repeat(i,0,a[7])cout<<'c';
    repeat(i,0,a[8])cout<<'e';
    repeat(i,0,a[9])cout<<'s';
    cout<<endl;
}
signed main(){
    int T=1; //cin>>T;
    while(T--)Solve();
    return 0;
}
```

## C. Even Picture

事实证明（~~乱搞可得~~），下面这种排列方法可以切这题。

（$n=5$ 的时候）

![img](https://img2020.cnblogs.com/blog/1860292/202006/1860292-20200619020111541-1798412317.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int n;
void Solve(){
    int n; cin>>n;
    cout<<3*n+4<<endl;
    repeat(i,1,n+2){
        cout<<i<<' '<<i<<endl;
        cout<<i+1<<' '<<i<<endl;
        cout<<i<<' '<<i+1<<endl;
    }
    cout<<n+2<<' '<<n+2<<endl;
}
signed main(){
    int T=1; //cin>>T;
    while(T--)Solve();
    return 0;
}
```

## D. AND, OR and square sum

事实证明（~~想想感觉很对~~），先让 `a[1]` 尽可能大，在此基础上让 `a[2]` 尽可能大，以此类推，这样答案最优。

~~我不会证明。~~

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
int cnt[110];
void Solve(){
    int n; cin>>n;
    repeat(i,0,n){
        int x; cin>>x;
        repeat(j,0,21)cnt[j]+=(x>>j)&1;
    }
    int ans=0;
    repeat(i,0,n){
        int x=0;
        repeat(j,0,21)
        if(cnt[j]>i){
            x|=1<<j;
        }
        ans+=x*x;
    }
    cout<<ans<<endl;
}
signed main(){
    int T=1; //cin>>T;
    while(T--)Solve();
    return 0;
}
```

## E. Ski Accidents

大意：在一个 DAG 中删除一些点使得不存在长度为 2 的路径。要求删除的点数不大于 $\dfrac 4 7 n$。

前半小时切了前四题，后两个小时都没能做出 E，枯了。首先这个 $\dfrac 4 7$ 就很有趣，它正好是一棵三层的满二叉树，删除所有叶子的情况。因此我猜测，对于每个有孙子节点的点，删除其所有孙子，这么写了交上去，wa6。还剩不到半小时，我终于搞出了一个数据 hack 了自己：

```text
1
10 9
3 4
4 5
4 6
2 6
6 7
6 8
1 8
8 9
8 10
```

再后来针对数据修改了很久也还是 wa6，~~没办法只能看题解了~~。

首先把所有点分成 3 类，`V0`, `V1`, `V2`。其中 `V2` 接下来会被删掉（如果存在边 `(u,v)`，我把 `u` 称为 `v` 的一个父亲，把 `v` 称为 `u` 的儿子）。

- `V0` 的父亲只能是 `V2`，或者无父亲。也就是说，删掉 `V2` 后 `V0` 就没有父亲了。
- `V1` 的父亲中不能出现 `V1`，并且要出现至少一个 `V0`。
- `V2` 的父亲要至少出现一个 `V1`。

为确定点的类型，只要按照拓扑序访问每个点。如果父亲中出现一个 `V1` 那就是 `V2`，除此之外出现一个 `V0` 那就是 `V1`，除此之外都是 `V0`。我们发现，删掉所有 `V2` 后，所有还尚存的边一定连接 `V0` 和 `V1`，（不存在 `V0-V0` 之类的边），完美符合题意。同时，每个 `V2` 都至少连接一个 `V1`，为了让 `V2` 尽可能多，那就让 `V1` 连接两个 `V2`；同理，让每个 `V0` 连接两个 `V1`，这样 `V2` 的比例最高也不会超 $\dfrac 4 7$，完美符合。

这个答案确实是我的“一棵三层的满二叉树删掉叶子”的想法的延伸，但是好难想啊……

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2;
#define int ll
vector<int> a[N],ans;
int w[N];
void Solve(){
    int n,m; cin>>n>>m;
    repeat(i,1,n+1)a[i].clear(),w[i]=0; ans.clear();
    while(m--){
        int x,y; cin>>x>>y;
        a[y].push_back(x);
    }
    repeat(x,1,n+1){
        for(auto p:a[x])
        if(w[p]!=2)
            w[x]=max(w[x],w[p]+1);
        if(w[x]==2)ans.push_back(x);
    }
    cout<<ans.size()<<endl;
    for(auto i:ans)cout<<i<<' '; cout<<endl;
}
signed main(){
    int T=1; cin>>T;
    while(T--)Solve();
    return 0;
}
```
